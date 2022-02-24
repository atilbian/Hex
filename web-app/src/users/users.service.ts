
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  private async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async findOne(username: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ username: username }, { password: await this.hashPassword(password) }]
    });
    return user;
  }

  async create(username: string, password: string): Promise<User> {
    const user = this.usersRepository.create({
      username: username,
      password: await this.hashPassword(password)
    });
    return await this.usersRepository.save(user)
  }
}
