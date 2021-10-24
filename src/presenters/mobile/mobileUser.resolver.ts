import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MobileUsers } from './entities/MobileUser';
import { CreateMobileUserInput, UpdateMobileUserInput } from './dto/user.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { CurrentUser } from 'src/common/auth/jwt/jwt.decorator';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt.guard';
import { UsersService } from 'src/services/users.service';

@Resolver(() => MobileUsers)
export class MobileUsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginResponseDto)
  async mobileUserLogin(
    @Args('loginRequestDto') loginRequestDto: LoginRequestDto,
  ) {
    const { email, token } = await this.usersService.login(
      loginRequestDto.email,
      loginRequestDto.password,
    );
    return { email, token };
  }

  @Mutation(() => MobileUsers)
  async createMobileUser(
    @Args('createUserInput') createUserInput: CreateMobileUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [MobileUsers])
  @UseGuards(JwtAuthGuard)
  async findAllMobileUsers() {
    return this.usersService.findAll();
  }

  @Query(() => MobileUsers)
  @UseGuards(JwtAuthGuard)
  async findOneMobileUser(@CurrentUser() user: MobileUsers) {
    console.log(user, '333~');
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => MobileUsers)
  async updateMobileUser(
    @Args('updateUserInput') updateUserInput: UpdateMobileUserInput,
  ) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
}
