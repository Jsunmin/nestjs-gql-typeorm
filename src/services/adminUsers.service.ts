import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { AdminUsers } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUsers)
    private adminUserRepository: Repository<AdminUsers>,
    private authService: AuthService,
  ) {}

  async create(userInfo: AdminUsers): Promise<AdminUsers> {
    const existedUser = await this.adminUserRepository.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (existedUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const newUser = this.adminUserRepository.create(userInfo);
    // 비밀번호 해시화
    userInfo.password = await this.authService.hashPassword(userInfo.password);

    return this.adminUserRepository.save(newUser);
  }

  findAll() {
    return this.adminUserRepository.find();
  }

  async findOne(id: number) {
    return this.adminUserRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOnePassword(id: number) {
    return this.adminUserRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'password'],
    });
  }

  update(id: number, updateUserInput: Partial<AdminUsers>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
