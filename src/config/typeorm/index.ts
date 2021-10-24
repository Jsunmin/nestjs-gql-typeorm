import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM } from 'src/environments';
import {
  Hospitals,
  Doctors,
  DoctorTags,
  Users,
  AdminUsers,
  Roles,
} from 'src/entities';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: TYPEORM.SQL_HOST,
  port: TYPEORM.SQL_PORT,
  username: TYPEORM.SQL_USERNAME,
  password: TYPEORM.SQL_PASSWORD,
  database: TYPEORM.SQL_DATABASE,
  entities: [Hospitals, Doctors, DoctorTags, Users, AdminUsers, Roles],
  // 마이그레이션 관련 세팅
  // migrations: [__dirname + '/src/migrations/*.ts'],
  // cli: { migrationsDir: 'src/migrations' },
  synchronize: true, // 서버 -> 디비 싱크 (데이터 날아가는 이슈.. prd X)
  logging: true, // 개발시 ORM 쿼리로그를 보고 ~ 튜닝을 해야함!
  // keepConnectionAlive: true, // DB 연결 끝내지 않도록!
};

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: TYPEORM.SQL_HOST,
      port: TYPEORM.SQL_PORT,
      username: TYPEORM.SQL_USERNAME,
      password: TYPEORM.SQL_PASSWORD,
      database: TYPEORM.SQL_DATABASE,
      entities: [Hospitals, Doctors, DoctorTags, Users, AdminUsers, Roles],
      // entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true,
    };
  }
}
