import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HospitalAdminService } from './hospitalAdmin.service';
import { HospitalAdmin } from './entities/hospitalAdmin.entity';
import { CreateHospitalAdminInput } from './dto/create-hospitalAdmin.input';
import { UpdateHospitalAdminInput } from './dto/update-hospitalAdmin.input';

@Resolver(() => HospitalAdmin)
export class HospitalAdminResolver {
  constructor(private readonly hospitalAdminService: HospitalAdminService) {}

  @Mutation(() => HospitalAdmin)
  createHospitalAdmin(
    @Args('createHospitalAdminInput')
    createHospitalAdminInput: CreateHospitalAdminInput,
  ) {
    return this.hospitalAdminService.create(createHospitalAdminInput);
  }

  @Query(() => [HospitalAdmin], { name: 'hospitalAdmin' })
  findAll() {
    return this.hospitalAdminService.findAll();
  }

  @Query(() => HospitalAdmin, { name: 'hospitalAdmin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hospitalAdminService.findOne(id);
  }

  @Mutation(() => HospitalAdmin)
  updateHospitalAdmin(
    @Args('updateHospitalAdminInput')
    updateHospitalAdminInput: UpdateHospitalAdminInput,
  ) {
    return this.hospitalAdminService.update(
      updateHospitalAdminInput.id,
      updateHospitalAdminInput,
    );
  }

  @Mutation(() => HospitalAdmin)
  removeHospitalAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.hospitalAdminService.remove(id);
  }
}
