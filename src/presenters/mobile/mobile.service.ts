import { Injectable } from '@nestjs/common';

// 이슈: 여기서는 클라이언트 도메인만의 서비스를 처리하면 어떨까?
@Injectable()
export class MobileService {
  findAll() {
    return `This action returns all mobile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobile`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobile`;
  }
}
