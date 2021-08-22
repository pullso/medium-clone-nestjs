import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { JWT_SECRET } from '../../config';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        user: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ['id', 'username', 'image', 'bio', 'email', 'password'] },
    );

    if (!user) {
      throw new HttpException(
        'Email is not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Password is not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
}
