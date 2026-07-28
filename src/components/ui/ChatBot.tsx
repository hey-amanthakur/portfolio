import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import ChatWidget from '@hey-amanthakur/chat-bot/widget.esm';

const CHATBOT_API_URL: string = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:3001';

export const ChatBot: FC = () => {
  const widgetRef = useRef<ChatWidget | null>(null);

  useEffect(() => {
    const stylesBefore = new Set(document.head.querySelectorAll('style'));

    try {
      widgetRef.current = new ChatWidget({
        clientId: 'aman-thakur',
        apiUrl: CHATBOT_API_URL,
        primaryColor: '#ff6b35',
        icon: '💬',
        headerTitle: 'Chat with Aman',
        position: 'bottom-right',
        greeting: "Hey! I'm Aman's AI assistant. Ask me about his services, skills, or how to get in touch.",
      });
    } catch (err) {
      console.error('Failed to load chatbot widget:', err);
    }

    return () => {
      document.querySelectorAll('.cw-bubble, .cw-container').forEach((el) => { el.remove(); });
      document.head.querySelectorAll('style').forEach((s) => {
        if (!stylesBefore.has(s)) {
          s.remove();
        }
      });
    };
  }, []);

  return null;
};

export default ChatBot;
