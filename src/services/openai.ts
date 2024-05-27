import OpenAI from 'openai';

class OpenAIAPI {
  private readonly apiKey: string;
  private openaiInstance: OpenAI;
  private readonly defaultModel = 'gpt-4o';

  constructor(apiKey: string | undefined) {
    if (!apiKey) throw new Error('OpenAI API key is undefined!');
    this.apiKey = apiKey;
    this.openaiInstance = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  async createChatCompletion(message: string, model = this.defaultModel): Promise<OpenAI.Chat.ChatCompletion> {
    try {
      return await this.openaiInstance.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: model,
      });
    } catch (error) {
      console.error('Chat completion error:', error);
      throw error;
    }
  }
}

const openAI = new OpenAIAPI(process.env.OPENAI_KEY);

export default openAI;
