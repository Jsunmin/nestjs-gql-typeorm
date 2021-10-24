import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard : passport strategy를 자동으로 실행해줌
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}