import { ChatBot } from '@hey-amanthakur/chat-bot';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'sk-or-v1-your-key-here') {
  console.error('Missing OPENROUTER_API_KEY in .env — chatbot server cannot start.');
  process.exit(1);
}

const PORT = Number(process.env.CHATBOT_PORT ?? 3001);

ChatBot.start({
  port: PORT,
  openrouterKey: OPENROUTER_API_KEY,
  allowedOrigins: ['http://localhost:3000', 'http://localhost:5173', 'https://amanthakur.dev'],
  clients: {
    'aman-thakur': {
      name: 'Aman Thakur',
      tone: 'friendly and professional',
      greeting: "Hey! I'm Aman's AI assistant. Ask me about his services, skills, or how to get in touch.",
      max_tokens: 500,
      business_info: {
        email: '099amanthakur1@gmail.com',
        phone: '+91 7762021493',
      },
      services: [
        {
          name: 'Full-Stack Engineering',
          price: 'Custom quote',
          description:
            'Production-grade React/TypeScript frontends paired with scalable Java & Spring Boot APIs. Clean architecture, strict typing, CI/CD pipelines, and meaningful test coverage.',
        },
        {
          name: 'AI Systems & Agents',
          price: 'Custom quote',
          description:
            'Embed real intelligence into your product — prompt-tuned LLM features, semantic RAG search, and multi-tool autonomous agents that collapse hours of manual work into seconds.',
        },
        {
          name: 'Content & Creator Tech',
          price: 'Custom quote',
          description:
            'For founders and creators who want a technical edge. Influencer collabs, retention-focused reel strategy, and lightweight content tooling — analytics dashboards, automations, and editing pipelines.',
        },
      ],
      faqs: [
        {
          question: 'What is Aman\'s tech stack?',
          answer:
            'Aman primarily works with React, TypeScript, TailwindCSS on the frontend and Java, Spring Boot, Python on the backend. He also builds AI agent systems using LLMs and RAG architectures.',
        },
        {
          question: 'Is Aman available for freelance work?',
          answer:
            'Yes! Aman takes on select freelance projects. Reach out via the contact section or WhatsApp to discuss your project requirements.',
        },
        {
          question: 'How can I contact Aman?',
          answer:
            'You can email Aman at 099amanthakur1@gmail.com, message on WhatsApp at +91 7762021493, or connect on LinkedIn / GitHub — all linked in the footer.',
        },
        {
          question: 'Does Aman work on AI projects?',
          answer:
            'Absolutely. Aman has hands-on experience with LLMs, RAG pipelines, autonomous agents, and computer vision. He won Smart India Hackathon 2022 with an AI-based assistive system.',
        },
        {
          question: 'What are Aman\'s rates?',
          answer:
            'Rates depend on project scope and complexity. Aman offers both hourly and fixed-price engagement models. Contact him for a custom quote.',
        },
        {
          question: 'Can Aman build a chatbot for my business?',
          answer:
            'Yes! Aman has experience building embeddable AI chatbots powered by OpenRouter and LLMs — like the one you are chatting with right now.',
        },
      ],
      policies: [
        '50% advance payment required before starting any freelance project.',
        'Revisions are included within the agreed project scope.',
        'Source code is transferred to the client upon final payment.',
      ],
    },
  },
}).then(({ url }) => {
  console.log(`Chatbot server running at ${url}`);
}).catch((err: unknown) => {
  console.error('Failed to start chatbot server:', err);
  process.exit(1);
});
