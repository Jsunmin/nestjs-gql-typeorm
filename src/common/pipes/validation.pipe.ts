/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserInputError } from 'apollo-server-core';

/**
 * 주어진 인풋값의 타입 변경 & 유효성 체크를 하는 파이프
 * pipe and filter 패턴: 주어진 인풋에, 단방향 파이프를 여러개 붙이면서 이전의 파이프 결과값을 입력값으로 받아 작업 수행 (미들웨어?!)
 *  각 목적에 맞는 파이프를 연결해, 인풋에 대한 연속적인 작업이 가능하다!
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // destructuring metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // value: input으로 들어오는 데이터 객체
    // metatype: 정의한 DTO
    const object = plainToClass(metatype, value); // 해당 정보로 타입체크할 객체 만들고
    const errors = await validate(object); // dto, entity에서 제공한 타입규정 체크!

    // input 전체에 대한 유효성검사를 한번에 함으로써, 여러 에러가 나타날수 있음 (<= fields.length)
    if (errors.length > 0) {
      // 이렇게 던진 에러는 에러 필터를 통해 클라이언트로!
      throw new UserInputError(
        `Form Arguments invalid: ${this.formatErrors(errors)}`,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((err) => {
        for (const property in err.constraints) {
          return err.constraints[property];
        }
      })
      .join(', ');
  }
}
