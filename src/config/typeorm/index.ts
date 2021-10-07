import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM } from '../../environments';
import { Hospitals } from '../../entities/Hospitals';

const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: TYPEORM.SQL_HOST,
  port: TYPEORM.SQL_PORT,
  username: TYPEORM.SQL_USERNAME,
  password: TYPEORM.SQL_PASSWORD,
  database: TYPEORM.SQL_DATABASE,
  entities: [Hospitals],
  // 마이그레이션 관련 세팅
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  synchronize: false, // 서버 -> 디비 싱크 (데이터 날아가는 이슈.. prd X)
  logging: true, // 개발시 ORM 쿼리로그를 보고 ~ 튜닝을 해야함!
  keepConnectionAlive: true, // DB 연결 끝내지 않도록!
};

export default ormConfig;
