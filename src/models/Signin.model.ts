import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseModel } from './base.model';

export class SigninModel extends BaseModel {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  public email!: string;

  @IsNotEmpty({ message: 'password is required' })
  public password!: string;
}
