/* eslint-disable @typescript-eslint/naming-convention */
declare module '@hey-amanthakur/chat-bot/widget.esm' {
  interface IChatWidgetConfig {
    readonly clientId: string;
    readonly apiUrl: string;
    readonly primaryColor: string;
    readonly icon: string;
    readonly headerTitle: string;
    readonly position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    readonly greeting: string;
  }

  export default class ChatWidget {
    constructor(config: IChatWidgetConfig);
    readonly container: HTMLDivElement;
  }
}

interface ImportMetaEnv {
  readonly VITE_CHATBOT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
