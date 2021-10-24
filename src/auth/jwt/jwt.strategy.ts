import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users, AdminUsers } from 'src/entities';
import { PayloadType } from '../dto/jwt.payload.dto';
import { TOKEN_SECRET } from 'src/environments';

// 인증 전략

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(AdminUsers)
    private adminUserRepository: Repository<AdminUsers>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKEN_SECRET,
    });
  }

  // guard 에서 토큰 인증 후 해당 로직 타면서, 요청자 정보 받아옴
  async validate(payload: PayloadType) {
    let user;
    if (payload.referenceType === 'CLIENT') {
      user = await this.userRepository.findOne({
        where: {
          id: payload.referenceId,
        },
      });
    } else if (payload.referenceType === 'ADMIN') {
      user = await this.adminUserRepository.findOne({
        where: {
          id: payload.referenceId,
        },
      });
    } else {
      throw new UnauthorizedException('접근오류: Invalid Type');
    }

    if (!user) {
      throw new UnauthorizedException('접근오류: Invalid Id');
    }
    delete user.password;

    return user;
  }
}
