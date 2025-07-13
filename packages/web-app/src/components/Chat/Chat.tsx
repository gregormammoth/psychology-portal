import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  from: string;
  fromUsername: string;
  timestamp: string;
}

interface User {
  userId: string;
  username: string;
}

interface TypingUser {
  userId: string;
  username: string;
  isTyping: boolean;
}

export const Chat: React.FC = () => {
  const { t } = useTranslation('common');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const newSocket = io('http://localhost:3001');
    const newSocket = io('http://13.60.225.240:3001', {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('message:receive', (message: Message) => {
      setMessages(prev => [...prev, message]);
      setIsLoading(false);
    });

    socket.on('user:joined', (user: User) => {
      setUsers(prev => [...prev, user]);
    });

    socket.on('user:left', (user: User) => {
      setUsers(prev => prev.filter(u => u.userId !== user.userId));
    });

    socket.on('users:list', (usersList: [string, string][]) => {
      setUsers(usersList.map(([userId, username]) => ({ userId, username })));
    });

    socket.on('user:typing', (typingUser: TypingUser) => {
      setTypingUsers(prev => {
        const filtered = prev.filter(u => u.userId !== typingUser.userId);
        return typingUser.isTyping ? [...filtered, typingUser] : filtered;
      });
    });

    return () => {
      socket.off('message:receive');
      socket.off('user:joined');
      socket.off('user:left');
      socket.off('users:list');
      socket.off('user:typing');
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && socket) {
      setIsLoading(true);
      socket.emit('user:join', username);
      setIsJoined(true);
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      setIsLoading(true);
      socket.emit('message:send', { text: message });
      setMessage('');
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('user:typing', true);
      setTimeout(() => {
        socket.emit('user:typing', false);
      }, 1000);
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-start justify-center">
        <form onSubmit={handleJoin} className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-display font-bold text-primary-700 mb-6">{t('chat.join')}</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('chat.enterUsername')}
            className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-300 relative"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {t('chat.joining')}
              </div>
            ) : (
              t('chat.join')
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-4 h-[80vh]">
          <div className="col-span-1 bg-primary-50 p-4 border-r border-primary-200">
            <h3 className="font-display text-lg font-semibold text-primary-700 mb-4">{t('chat.onlineUsers')}</h3>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.userId} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-primary-700">{user.username}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-3 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`mb-4 ${msg.from === socket?.id ? 'text-right' : 'text-left'
                    }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${msg.from === socket?.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-primary-100 text-primary-700'
                      }`}
                  >
                    <div className="font-medium">{msg.fromUsername}</div>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div className="text-xs opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                    {msg.from === 'ai' && (
                      <div className="mt-2">
                        <a
                          href="/contacts"
                          className="text-primary-600 hover:text-primary-700 underline"
                        >
                          {t('chat.bookConsultation')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typingUsers.length > 0 && (
                <div className="text-sm text-primary-500 italic">
                  {typingUsers.map(user => user.username).join(', ')} {t('chat.typing')}
                </div>
              )}
              {isLoading && (
                <div className="flex justify-center my-4">
                  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-primary-200">
              <div className="flex space-x-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleTyping}
                  placeholder={t('chat.typeMessage')}
                  className="flex-1 p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  disabled={isLoading}
                  rows={3}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition duration-300 relative"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('chat.sending')}
                    </div>
                  ) : (
                    t('chat.send')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};