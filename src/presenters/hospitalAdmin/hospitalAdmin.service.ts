import { Injectable } from '@nestjs/common';
import {
  CreateAdminHospitalInput,
  UpdateAdminHospitalInput,
} from './dto/adminHospital.dto';

@Injectable()
export class HospitalAdminService {
  createHospitalAdditionalLogic(
    createHospitalAdminInput: CreateAdminHospitalInput,
  ) {
    console.log('[custom]:', createHospitalAdminInput);
    return true;
  }

  findHospitalAdditionalLogic() {
    return `This action returns all hospitalAdmin`;
  }

  findOneHospitalAdditionalLogic(id: number) {
    return `This action returns a #${id} hospitalAdmin`;
  }

  updateHospitalAdditionalLogic(
    id: number,
    updateHospitalAdminInput: UpdateAdminHospitalInput,
  ) {
    console.log(id, updateHospitalAdminInput);
    return true;
  }
}
