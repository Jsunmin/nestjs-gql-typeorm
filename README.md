# Monolith Architecture sample
> NestJs + TypeOrm + GQL (code-first)


## Setting

```bash
nest new project-name

# typeorm
yarn add typeorm mysql2 @nestjs/typeorm
# nest@8 ~ nestjs/gql@9 ~ apollo@3
yarn add @nestjs/graphql graphql apollo-server-express
```


## Ref
- https://github.com/hvpaiva/clean-architecture-nestjs/tree/master/src
- https://blog.coderifleman.com/2017/12/18/the-clean-architecture/
- https://github.com/chnirt/nestjs-graphql-best-practice/tree/cicd/src 
- https://github.com/lujakob/nestjs-realworld-example-app/tree/master/src


## Note
 1. TypeORM: DB관련 ORM은 TypeORM을 통해서, 데이터 모델링과 기본적인 Data Mapper 패턴으로 DML 활용
    https://typeorm.io/#/working-with-repository
 2. Type-graphql: TypeOrm으로 정의한 데이터 모델에 간단한 데코레이터로 GQL용 스키마를 클래스로 정의함
    https://typegraphql.com/docs/getting-started.html
 3. @nestjs/graphql: 그런데, @nestjs/graphql 에서 code-first 전략을 쓰면, type-graphql이랑 차이가 없다??!
    https://github.com/nestjs/nest/blob/master/sample/23-graphql-code-first
    ~ reddit에 보면, nest의 해당 모듈은 초창기의 type-graphql을 받아와 내재화 한 것이라고 한다. - type-graphql 공식문서로 익숙해지자!
 4. code-first / shcema-first:
    - code-first: code type -> schema 로 (type-graphql 지향)
    - shcema-first: prisma, typegen 등은 shcema-first에서, 비동기적으로 (외부적으로) .ts file을 만든 느낌?!
      nexus의 경우에는 code-first로 처리한 것!
    - schema-first -> code-first에서 진화한 양상 (gql-tool ~ 3rd framework for code-first)
    - 둘 다 방향성의 차이일뿐 여러 툴을 쓰면 결국 SDL과 DDL 일원화를 달성할 수 있다. (SRP)
    - 참고 자료
      https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3 ~ schema-first에 대한 단점과 대안 code-first
 5. typeorm +a
    - schema:drop / schema:sync : 명령어를 통해, 디비 테이블 세팅하거나 아예 날림 (typeorm)
    - typeorm-model-generator: 기존 프로젝트의 DB를 떠와서 typeorm으로 변형해주는 lib (typeorm-model-generator)
    - seeding : 초기 데이터 or 테스트 데이터 세팅을 위한 기능 (typeorm-seeding)
    - seeding : 초기 데이터 세팅 (typeorm-seeding)
    - seeding : 초기 데이터 세팅 (typeorm-seeding)
    - migration : DB 테이블의 수정을 code로 기록함 (롤백도 가능) (typeorm)
         typeorm migration:generate -n xxxxx ~ 실제 DB와 TS로 정의한 스키마를 비교해 migration
         typeorm migration:create -n xxxxx ~ DB에 migration할 내용을 작성할 파일 생성
         - 기입해서 migrate 명령치면 적용 (typeorm migration:run / typeorm migration:revert)
         - TS에서 인식 이슈가 있다. 참고하자!
  6. validation
    - class-validator: 데코레이터 패턴으로, 엔티티 or DTO의 특정 필드값의 유효성 조건을 건다!
      https://www.npmjs.com/package/class-validator#Validation%20decorators
  7. Gurard
    - 주로 권한에 대한 체크가 있을때 사용함
    - 가드는 인터셉터보다 더 먼저 수행된다!
