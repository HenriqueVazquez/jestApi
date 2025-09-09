import { Controller, Post, Body } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Controller('langchain')
export class LangchainController {
  constructor(private readonly langchainService: LangchainService) { }

  @Post('translate')
  async translate(@Body('text') text: string) {
    const messages = [
      new SystemMessage("Translate the following from English into Portuguese"),
      new HumanMessage(text),
    ];

    const response = await this.langchainService.sendMessage(messages);
    return { result: response.content };
  }
}
