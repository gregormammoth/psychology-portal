import { Chat } from '../../components/Chat/Chat';
import { Layout } from '../../components/layout/Layout';

export default function ChatPage() {
  return (
    <Layout
      title="Chat - Psychology Portal"
      description="Real-time chat for Psychology Portal"
    >
      <div className="container mx-auto px-4 py-8">
        <Chat />
      </div>
    </Layout>
  );
} 