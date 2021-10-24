import { InputType, Int, Field } from '@nestjs/graphql';
import { AdminDoctors } from '../entities/AdminDoctor.entity';

@InputType({ isAbstract: true })
export class CreateDoctorInput extends AdminDoctors {
  @Field()
  name: string;

  @Field()
  position: string;

  @Field(() => Int)
  gender: number;

  @Field({ nullable: true })
  image: string;

  // doctorTag의 경우 생성 시기를 분리하자!

  @Field(() => Int, { nullable: true })
  hospitalId: number;

  // 1. 여기서는 hospital. id 만 있으면 된다! ~ 이렇게 구현할까 그냥 hospitalId number 만 받을까?
  // 2. 엔티티 오브젝트를 그대로 넣으면 순환 참조 일어남 (무한 네스티드)
  // @Field(() => UpdateAdminHospitalInput)
  // adminHospital: UpdateAdminHospitalInput;
}

/**
 * there's several practical reasons why you can't use an object type as an input object type or use an object type as an input object type
 * https://stackoverflow.com/questions/41743253/whats-the-point-of-input-type-in-graphql
 * https://velog.io/@cadenzah/graphql-input-type
 *
 * - Object 타입이 가지는 필드에 대한 리졸버 함수를 정의합니다.그런데 이러한 특성은 input 타입의 맥락에서는 전혀 통하지 않습니다.
 *    예를 들어, input 타입의 필드는 리졸브할 수 없습니다.
 * - 출력 타입은 GraphQL 서비스가 만들어내는 응답의 일부로서 반환되는 타입입니다. 반면 입력 타입은 필드 또는 지시자 인자에 대한 입력으로 유효하게 사용할 수 있는 타입입니다.
 *    이 두 분류 간에 겹치는 부분이 존재합니다(예를 들어, 스칼라, 열거, 리스트, Non-null(!) 등).
 *    하지만, 유니온과 인터페이스와 같은 추상 타입은 입력의 상황에서는 성립할 수 없으므로 입력으로 사용될 수 없습니다.
 *    Object 타입과 input 타입을 분리하면, input 타입이 사용되어야 할 곳에 추상 타입이 사용되는 일이 없도록 보장할 수 있습니다.
 * - 위에서 언급한 것처럼, ObjectType에서는 명시되어야 하나, InputType에서는 숨겨야 하는 경우.
 *    objectType에서는 필수값이나, InputType에서는 nullable인 경우.
 *    objectType에서 정의된 관계에 대한 정의가 필수가 되는 이슈.
 *    등 고려해볼 때 inputType과 objectType을 구분해야 한다!
 */
