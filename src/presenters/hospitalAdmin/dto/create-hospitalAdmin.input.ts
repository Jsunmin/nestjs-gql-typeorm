import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHospitalAdminInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
