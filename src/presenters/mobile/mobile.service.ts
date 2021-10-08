import { Injectable } from '@nestjs/common';

// 이슈: 여기서는 클라이언트 도메인만의 서비스를 처리하면 어떨까?
@Injectable()
export class MobileService {
  customMobileHospitalData(...args: any[]) {
    console.log(args);
    return true;
  }
}
