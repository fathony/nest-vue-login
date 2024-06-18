import { IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: "at least the password consists of min 6 character, one uppercase letter, one number and one symbol" })
  @IsStrongPassword({
    minLength   : 6,
    minUppercase: 1,
    minNumbers  : 1,
    minSymbols  : 1
  }, { message: "at least the password consists of min 6 character, one uppercase letter, one number and one symbol" })
  @IsNotEmpty()
  password: string;
}