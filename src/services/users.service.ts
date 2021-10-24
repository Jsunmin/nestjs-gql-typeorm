import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';
import { AuthService } from 'src/common/auth/auth.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private authService: AuthService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다!');
    }

    // password 일치체크
    const result = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!result) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요!');
    }
    // 해당 user token 전달
    const { token } = this.authService.getUserAccessToken(user.id);

    return {
      email,
      token,
    };
  }

  async create(userInfo: Users): Promise<Users> {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (existedUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }
    // 비밀번호 해시화
    userInfo.password = await this.authService.hashPassword(userInfo.password);

    const newUser = this.userRepository.create(userInfo);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOnePassword(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'password'],
    });
  }

  update(id: number, updateUserInput: Partial<Users>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
