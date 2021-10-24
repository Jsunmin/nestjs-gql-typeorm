import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, AdminUsers } from 'src/entities';
import { AuthService } from './auth.service';
import { TOKEN_SECRET } from 'src/environments';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AdminUsers]),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    // token 생성시 타는 설정 (시크릿키 주의!)
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
