import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserJson: User): Promise<User> {
    const user = this.userRepository.create(createUserJson);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
    //return users.map((user) => plainToClass(User, user));
  }

  async findAllActive(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { isActive: true } });
    return users;
    //return users.map((user) => plainToClass(User, user));
  }

  async findOne(key: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        key: key,
        isActive: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID [${key}] not found`); // Sets 404 + message
    }
    return user;
    //return plainToClass(User, user);
  }

  async findOneByUserCode(userCode: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        loginId: userCode,
        isActive: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with Code [${userCode}] not found`); // Sets 404 + message
    }
    return user;
    //return plainToClass(User, user);
  }

  async update(key: string, updateJson: User): Promise<User | undefined> {
    await this.userRepository.update(key, updateJson);
    const user = this.findOne(key);
    return user;
    //return plainToClass(User, user);
  }

  async remove(key: string): Promise<void> {
    const user = await this.findOne(key);
    if (!user) {
      throw new NotFoundException(`User with ID [${key}] not found`); // Sets 404 + message
    }
    await this.userRepository.delete(key);
  }
}
