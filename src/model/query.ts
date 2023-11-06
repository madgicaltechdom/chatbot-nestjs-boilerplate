import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    mobileNumber: string,
    language: string,
    botID: string,
  ): Promise<User> {
    
    const user = new User();
    user.mobileNumber = mobileNumber;
    user.language = language;
    user.botID = botID;
    return this.userRepository.save(user);
  }
  async findUserByMobileNumber(
    mobileNumber: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobileNumber } });
  }
}
