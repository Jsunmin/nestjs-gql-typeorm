import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HospitalAdmin {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
