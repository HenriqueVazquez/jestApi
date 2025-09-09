import { Inject, Injectable } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { BaseMessageLike } from '@langchain/core/messages';
import type { ConfigType } from '@nestjs/config';
import appLangChainConfig from '../config/configuration';

@Injectable()
export class LangchainService {
  private model: ChatGoogleGenerativeAI;

  constructor(
    @Inject(appLangChainConfig.KEY)
    private configService: ConfigType<typeof appLangChainConfig>
  ) {
    this.model = new ChatGoogleGenerativeAI({
      model: this.configService.googleApiModel,
      temperature: this.configService.googleApiTemperature,
      apiKey: this.configService.googleApiKey,
    });
  }

  async sendMessage(messages: BaseMessageLike[]) {
    const response = await this.model.invoke(messages);
    return response;
  }
}
