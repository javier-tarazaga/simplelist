import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  findOneById(): Promise<UserDto> {
    return Promise.resolve<UserDto>({
      id: '1234',
      username: 'patata',
      displayName: 'Señor patata'
    });
  }
}