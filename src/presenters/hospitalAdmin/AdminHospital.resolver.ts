import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { HospitalsService } from 'src/services/hospitals.service';
import { HospitalAdminService } from './hospitalAdmin.service';
import { CreateAdminHospitalInput } from './dto/createAdminHospital.dto';
import { UpdateAdminHospitalInput } from './dto/updateAdminHospital.dto';
import { AdminHospitals } from './entities/AdminHospital.entity';

@Injectable()
@Resolver()
export class HospitalsResolver {
  constructor(
    private hospitalService: HospitalsService,
    private hospitalAdminService: HospitalAdminService,
  ) {}

  @Query(() => [AdminHospitals], { nullable: 'items' })
  async adminHospitals(
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number,
    @Args({ name: 'page', type: () => Int, defaultValue: 20 }) page: number,
  ): Promise<AdminHospitals[]> {
    return this.hospitalService.getHospitals(skip, page);
  }

  @Query(() => AdminHospitals)
  async adminhospital(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<AdminHospitals> {
    const hospital = await this.hospitalService.getHospital(id);
    console.log(hospital.getMaskedPhone()); // AR pattern?!
    return hospital;
  }

  @Mutation(() => AdminHospitals)
  async createAdminHospital(
    @Args({
      name: 'createAdminHospitalInput',
      type: () => CreateAdminHospitalInput,
      nullable: false,
    })
    createAdminHospitalInput: CreateAdminHospitalInput,
  ): Promise<AdminHospitals> {
    this.hospitalAdminService.createHospitalAdditionalLogic(
      createAdminHospitalInput,
    );
    const savedHospital = await this.hospitalService.createHospital(
      createAdminHospitalInput,
    );
    return savedHospital;
  }

  @Mutation(() => AdminHospitals)
  async updateAdminHospital(
    @Args({
      name: 'updateAdminHospitalInput',
      type: () => UpdateAdminHospitalInput,
      nullable: false,
    })
    updateAdminHospitalInput: UpdateAdminHospitalInput,
  ): Promise<AdminHospitals> {
    const savedHospital = await this.hospitalService.update(
      updateAdminHospitalInput.id,
      updateAdminHospitalInput,
    );
    this.hospitalAdminService.updateHospitalAdditionalLogic(
      updateAdminHospitalInput.id,
      updateAdminHospitalInput,
    );
    return savedHospital;
  }
}
