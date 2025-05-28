import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async updateUser(id: number, name: string) {
    const user = await this.getUser(id);
    user.name = name;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
} 