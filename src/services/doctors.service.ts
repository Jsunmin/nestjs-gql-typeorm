import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctors, Hospitals } from 'src/entities';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctors)
    private doctorRepository: Repository<Doctors>,
    @InjectRepository(Hospitals)
    private hospitalRepository: Repository<Hospitals>,
  ) {}

  // ObjectType을 때려박아서 처리하려고 생각하지 말고, InputType의 여러 바리에이션을 고려해 args로 처리하자!
  async create({
    createDoctorInput,
    relationalHospitalId,
  }: {
    createDoctorInput: Doctors;
    relationalHospitalId?: number;
  }) {
    const doctor = this.doctorRepository.create(createDoctorInput);
    if (relationalHospitalId) {
      doctor.hospital = await this.hospitalRepository.findOne({
        where: { id: relationalHospitalId },
      });
      if (!doctor.hospital) {
        throw new NotFoundException('존재하지 않는 병원입니다.');
      }
    }
    return this.doctorRepository.save(doctor);
  }

  async findAll() {
    return this.doctorRepository.find({
      relations: ['hospital'],
    });
  }

  async findOne(id: number) {
    return this.doctorRepository.findOne({
      where: { id },
      relations: ['hospital'],
    });
  }

  async update(id: number, updateDoctorInput: Partial<Doctors>) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['hospital'],
    });
    if (updateDoctorInput.hospital) {
      doctor.hospital = await this.hospitalRepository.findOne({
        where: { id: updateDoctorInput.hospital },
      });
      if (!doctor.hospital) {
        throw new NotFoundException('존재하지 않는 병원입니다.');
      }
    }
    this.doctorRepository.merge(doctor, updateDoctorInput);
    await this.doctorRepository.save(doctor);
    return doctor;
  }

  async remove(id: number) {
    const doctor = await this.doctorRepository.findOne({ id });
    return this.doctorRepository.remove(doctor);
  }
}
