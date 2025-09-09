import { Injectable } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { BaseMessageLike } from '@langchain/core/messages';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LangchainService {
  private model: ChatGoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    this.model = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: this.configService.get<string>('googleApiKey'),
    });
  }

  async sendMessage(messages: BaseMessageLike[]) {
    const response = await this.model.invoke(messages);
    return response;
  }
}
