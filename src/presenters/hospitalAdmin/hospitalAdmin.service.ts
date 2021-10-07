import { Injectable } from '@nestjs/common';
import { CreateHospitalAdminInput } from './dto/create-hospitalAdmin.input';
import { UpdateHospitalAdminInput } from './dto/update-hospitalAdmin.input';

@Injectable()
export class HospitalAdminService {
  create(createHospitalAdminInput: CreateHospitalAdminInput) {
    return 'This action adds a new hospitalAdmin';
  }

  findAll() {
    return `This action returns all hospitalAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalAdmin`;
  }

  update(id: number, updateHospitalAdminInput: UpdateHospitalAdminInput) {
    return `This action updates a #${id} hospitalAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalAdmin`;
  }
}
