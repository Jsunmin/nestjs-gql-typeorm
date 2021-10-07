import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospitals } from 'src/entities/Hospitals';
import { Repository } from 'typeorm';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospitals)
    private hospitalRepository: Repository<Hospitals>,
  ) {}

  async getHospitals(skip: number, page: number) {
    const hospitals = await this.hospitalRepository.find({
      skip: skip * page,
      take: page,
    });
    return hospitals;
  }

  async getHospital(id: number) {
    return this.hospitalRepository.findOne({
      where: { id },
    });
  }

  async createHospital(hospitalInfo: Hospitals) {
    const existedHospital = await this.hospitalRepository.findOne({
      where: {
        name: hospitalInfo.name,
        phone: hospitalInfo.phone,
      },
    });
    if (existedHospital) {
      // 이렇게 에러만 정의하면 예외 처리가 잘 안됨 ~ 캐치해주는 프로세스가 필요!
      throw new BadRequestException('이미 존재하는 병원입니다.');
    }

    hospitalInfo.safePhone = hospitalInfo.phone.replace(/-/g, '##@');

    const hospital = this.hospitalRepository.create(hospitalInfo);
    return await this.hospitalRepository.save(hospital);
  }

  async update(id: number, updateHospitalInput: Partial<Hospitals>) {
    const hospital = await this.hospitalRepository.findOne({
      where: { id },
    });
    this.hospitalRepository.merge(hospital, updateHospitalInput);
    return this.hospitalRepository.save(hospital);
  }
}
