import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appLangChainConfig from '../config/configuration';
import { validationSchema } from '../config/validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from '../clientes/clientes.module';
import { LangchainModule } from 'src/langchain/langchain.module';
import { LangSmithModule } from 'src/langsmith/langsmith.module';
import { DatabaseModule } from 'src/database/database.module';
import langsmithConfig from 'src/config/langsmith.config';

@Module({
  imports: [
    LangchainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [langsmithConfig, appLangChainConfig],
      validationSchema,
    }),
    DatabaseModule,
    ClientesModule,
    LangSmithModule,
    LangchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
