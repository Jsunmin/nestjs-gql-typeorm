import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { HospitalsService } from 'src/services/hospitals.service';
import { MobileService } from './mobile.service';
import { UpdateMobileHospitalInput } from './dto/updateMobileHospital.dto';
import { MobileHospitals } from './entities/MobileHospital';

@Injectable()
@Resolver()
export class MobileHospitalsResolver {
  constructor(
    private hospitalService: HospitalsService,
    private mobileService: MobileService,
  ) {}

  @Query(() => [MobileHospitals], { nullable: 'items' })
  async mobileHospitals(
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number,
    @Args({ name: 'page', type: () => Int, defaultValue: 20 }) page: number,
  ): Promise<MobileHospitals[]> {
    return this.hospitalService.getHospitals(skip, page);
  }

  @Query(() => MobileHospitals)
  async mobilehospital(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<MobileHospitals> {
    const hospital = await this.hospitalService.getHospital(id);
    console.log(hospital.getMaskedPhone()); // AR pattern?!
    return hospital;
  }

  @Mutation(() => MobileHospitals)
  async updateMobileHospital(
    @Args({
      name: 'updateMobileHospitalInput',
      type: () => UpdateMobileHospitalInput,
      nullable: false,
    })
    updateMobileHospitalInput: UpdateMobileHospitalInput,
  ): Promise<MobileHospitals> {
    const savedHospital = await this.hospitalService.update(
      updateMobileHospitalInput.id,
      updateMobileHospitalInput,
    );
    // 이슈1 클라이언트 도메인레벨에서 추가한 컬럼들은 어디서 지지고 볶을까? 공용 서비스 레이어에서?
    this.mobileService.customMobileHospitalData(updateMobileHospitalInput);
    return savedHospital;
  }

  // @Mutation(() => MobileHospitals)
  // async createAdminHospital(
  //   @Args({
  //     name: 'updateMobileHospitalInput',
  //     type: () => UpdateMobileHospitalInput,
  //     nullable: false,
  //   })
  //   updateMobileHospitalInput: UpdateMobileHospitalInput,
  // ): Promise<MobileHospitals> {
  //   // 이슈2 DB 엔티티에서는 필수 내용임 -> 공용 service layer에서도 필수 -> 에러..
  //   // 서비스 레이어도 분리하던가 / create시 일괄된 type으로 넣던가?
  //   // 업데이트는 괜찬은데..
  //   const savedHospital = await this.hospitalService.createHospital(
  //     updateMobileHospitalInput,
  //   );
  //   console.log(savedHospital);
  //   return savedHospital;
  // }
}
