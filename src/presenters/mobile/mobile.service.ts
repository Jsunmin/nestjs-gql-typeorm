import { Injectable } from '@nestjs/common';
import { CreateMobileInput } from './dto/create-mobile.input';
import { UpdateMobileInput } from './dto/update-mobile.input';

@Injectable()
export class MobileService {
  create(createMobileInput: CreateMobileInput) {
    return 'This action adds a new mobile';
  }

  findAll() {
    return `This action returns all mobile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobile`;
  }

  update(id: number, updateMobileInput: UpdateMobileInput) {
    return `This action updates a #${id} mobile`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobile`;
  }
}
