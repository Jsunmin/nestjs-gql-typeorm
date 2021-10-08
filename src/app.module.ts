import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import gqlConfig from './config/graphql';
import ormConfig from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileModule } from './presenters/mobile/mobile.module';
import { HospitalAdminModule } from './presenters/hospitalAdmin/hospitalAdmin.module';

// 이슈0: 멀티플 엔드포인트 : https://github.com/nestjs/graphql/issues/721
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // code-first
    MobileModule,
    HospitalAdminModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/presenters/mobile/schema.gql'),
      path: 'mobile/graphql',
      include: [MobileModule],
      context: gqlConfig.createContext,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(
        process.cwd(),
        'src/presenters/hospitalAdmin/schema.gql',
      ),
      path: 'hospitaladmin/graphql',
      include: [HospitalAdminModule],
      context: gqlConfig.createContext,
    }),
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
