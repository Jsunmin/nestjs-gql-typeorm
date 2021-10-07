import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MobileService } from './mobile.service';
import { Mobile } from './entities/mobile.entity';
import { CreateMobileInput } from './dto/create-mobile.input';
import { UpdateMobileInput } from './dto/update-mobile.input';

@Resolver(() => Mobile)
export class MobileResolver {
  constructor(private readonly mobileService: MobileService) {}

  @Mutation(() => Mobile)
  createMobile(
    @Args('createMobileInput') createMobileInput: CreateMobileInput,
  ) {
    return this.mobileService.create(createMobileInput);
  }

  @Query(() => [Mobile], { name: 'mobile' })
  findAll() {
    return this.mobileService.findAll();
  }

  @Query(() => Mobile, { name: 'mobile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mobileService.findOne(id);
  }

  @Mutation(() => Mobile)
  updateMobile(
    @Args('updateMobileInput') updateMobileInput: UpdateMobileInput,
  ) {
    return this.mobileService.update(updateMobileInput.id, updateMobileInput);
  }

  @Mutation(() => Mobile)
  removeMobile(@Args('id', { type: () => Int }) id: number) {
    return this.mobileService.remove(id);
  }
}
