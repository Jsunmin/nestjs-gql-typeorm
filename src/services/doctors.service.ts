import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctors, Hospitals } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctors)
    private doctorRepository: Repository<Doctors>,
    @InjectRepository(Hospitals)
    private hospitalRepository: Repository<Hospitals>,
  ) {}

  async create(createDoctorInput: Doctors) {
    const doctor = this.doctorRepository.create(createDoctorInput);
    // TODO: 이렇게 관계 지어야만 할까?
    if (createDoctorInput.hospitalId) {
      doctor.hospital = await this.hospitalRepository.findOne({
        where: { id: createDoctorInput.hospitalId },
      });
      if (!doctor.hospital) {
        throw new Error('해당 병원 존재X!');
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
    if (updateDoctorInput.hospitalId) {
      doctor.hospital = await this.hospitalRepository.findOne({
        where: { id: updateDoctorInput.hospitalId },
      });
      if (!doctor.hospital) {
        throw new Error('해당 병원 존재X!');
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
