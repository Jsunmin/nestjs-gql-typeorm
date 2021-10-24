import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class LoginRequestDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType({ isAbstract: true })
export class LoginResponseDto {
  @Field()
  email: string;

  @Field()
  token: string;
}
