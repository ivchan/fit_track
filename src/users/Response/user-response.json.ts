import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponse {
  @Expose()
  key: string;

  @Expose()
  emailAddress: string;

  @Expose()
  userName: string;

  //hide
  isActive: boolean;
}
