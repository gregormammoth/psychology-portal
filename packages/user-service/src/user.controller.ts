import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() data: { id: number }) {
    return this.userService.getUser(data.id);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(@Payload() data: { id: number; name: string }) {
    return this.userService.updateUser(data.id, data.name);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() data: { id: number }) {
    return this.userService.deleteUser(data.id);
  }
} 