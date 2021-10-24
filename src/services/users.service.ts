import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(userInfo: Users): Promise<Users> {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (existedUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const newUser = this.userRepository.create(userInfo);
    // 비밀번호 해시화
    userInfo.password = await bcrypt.hash(userInfo.password, 12);

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
