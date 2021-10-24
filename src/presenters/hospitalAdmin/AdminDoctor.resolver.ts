import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DoctorsService } from 'src/services/doctors.service';
import { AdminDoctors } from './entities/AdminDoctor.entity';
import { CreateDoctorInput } from './dto/createDoctor.dto';
import { UpdateDoctorInput } from './dto/updateDoctor.dto';

@Resolver()
export class DoctorsResolver {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Mutation(() => AdminDoctors)
  async createAdminDoctor(
    @Args({
      name: 'createDoctorInput',
      type: () => CreateDoctorInput,
      nullable: false,
    })
    createDoctorInput: CreateDoctorInput,
  ): Promise<AdminDoctors> {
    return this.doctorsService.create({
      createDoctorInput,
      relationalHospitalId: createDoctorInput.hospitalId,
    });
  }

  @Query(() => [AdminDoctors], { nullable: 'items' })
  async adminDoctors() {
    return this.doctorsService.findAll();
  }

  @Query(() => AdminDoctors)
  async adminDoctor(@Args('id', { type: () => Int }) id: number) {
    return this.doctorsService.findOne(id);
  }

  @Mutation(() => AdminDoctors)
  updateAdminDoctor(
    @Args({
      name: 'updateDoctorInput',
      type: () => UpdateDoctorInput,
      nullable: false,
    })
    updateDoctorInput: UpdateDoctorInput,
  ) {
    return this.doctorsService.update(updateDoctorInput.id, updateDoctorInput);
  }

  @Mutation(() => AdminDoctors)
  removeAdminDoctor(@Args('id', { type: () => Int }) id: number) {
    return this.doctorsService.remove(id);
  }
}
