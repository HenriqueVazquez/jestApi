import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appLangChainConfig from '../config/configuration';
import { validationSchema } from '../config/validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from '../clientes/clientes.module';
import { LangchainModule } from 'src/langchain/langchain.module';
import { LangSmithModule } from 'src/langsmith/langsmith.module';

@Module({
  imports: [
    LangchainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appLangChainConfig],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
    }),
    ClientesModule,
    LangSmithModule,
    LangchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
