import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BCRYPT_SALT } from 'src/environments';
import { PayloadType } from './dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    // nestjs/typeorm 에서 제공하는 데코레이터 아래 객체에 대해 User에 Users table에 접근하는 기능 제공!?
    private jwtService: JwtService,
  ) {}

  // password 관련 메서드
  async hashPassword(password: string) {
    return bcrypt.hash(password, BCRYPT_SALT);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  // access token 관련
  getUserAccessToken(userId: number) {
    // 해당 user token 전달
    const payload: PayloadType = {
      referenceType: 'CLIENT',
      referenceId: userId,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  getAdminUserAccessToken(userId: number) {
    // 해당 user token 전달
    const payload: PayloadType = {
      referenceType: 'ADMIN',
      referenceId: userId,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
