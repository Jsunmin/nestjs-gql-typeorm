import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users, AdminUsers } from 'src/entities';
import { BCRYPT_SALT } from 'src/environments';
import { PayloadType } from './dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    // nestjs/typeorm 에서 제공하는 데코레이터 아래 객체에 대해 User에 Users table에 접근하는 기능 제공!?
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(AdminUsers)
    private adminUserRepository: Repository<AdminUsers>,
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

  async validateAdminUserLogin(email: string, password: string) {
    const user = await this.adminUserRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다!');
    }

    // password 일치체크
    const result = await this.comparePassword(password, user.password);
    if (!result) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요!');
    }
    // 해당 user token 전달
    const payload: PayloadType = {
      referenceType: 'ADMIN',
      referenceId: user.id,
    };
    return {
      email,
      token: this.jwtService.sign(payload),
    };
  }
}
