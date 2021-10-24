import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminUsers } from './entities/AdminUser.entity';
import {
  CreateAdminUserInput,
  UpdateAdminUserInput,
} from './dto/adminUser.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { CurrentUser } from 'src/common/auth/jwt/jwt.decorator';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt.guard';
import { AdminUsersService } from 'src/services/adminUsers.service';

@Resolver(() => AdminUsers)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Mutation(() => LoginResponseDto)
  async adminUserLogin(
    @Args('loginRequestDto') loginRequestDto: LoginRequestDto,
  ) {
    const { email, token } = await this.adminUsersService.login(
      loginRequestDto.email,
      loginRequestDto.password,
    );
    return { email, token };
  }

  @Mutation(() => AdminUsers)
  async createAdminUser(
    @Args('createUserInput') createUserInput: CreateAdminUserInput,
  ) {
    return this.adminUsersService.create(createUserInput);
  }

  @Query(() => [AdminUsers])
  @UseGuards(JwtAuthGuard)
  async findAllAdminUsers() {
    return this.adminUsersService.findAll();
  }

  @Query(() => AdminUsers)
  @UseGuards(JwtAuthGuard)
  async findOneAdminUser(@CurrentUser() user: AdminUsers) {
    console.log(user, '111~');
    return this.adminUsersService.findOne(user.id);
  }

  @Mutation(() => AdminUsers)
  async updateAdminUser(
    @Args('updateUserInput') updateUserInput: UpdateAdminUserInput,
  ) {
    return this.adminUsersService.update(updateUserInput.id, updateUserInput);
  }
}
