import Head from 'next/head';
import { Chat } from '../../components/Chat/Chat';

export default function ChatPage() {
  return (
    <div>
      <Head>
        <title>Chat - Psychology Portal</title>
        <meta name="description" content="Real-time chat for Psychology Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Chat />
    </div>
  );
} 