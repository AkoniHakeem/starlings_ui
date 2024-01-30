import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseModel } from './base.model';

export class SignupModel extends BaseModel {
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  confirmPassword: string;
}
