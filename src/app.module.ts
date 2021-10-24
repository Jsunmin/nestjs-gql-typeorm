import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import gqlConfig from './config/graphql';
import { ormConfig, TypeOrmConfigService } from './config/typeorm';
import { LoggerMiddleware } from './common';
import { MobileModule } from './presenters/mobile/mobile.module';
import { HospitalAdminModule } from './presenters/hospitalAdmin/hospitalAdmin.module';
import { AuthModule } from './auth/auth.module';

// 이슈0: 멀티플 엔드포인트 : https://github.com/nestjs/graphql/issues/721
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    // }),
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
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
