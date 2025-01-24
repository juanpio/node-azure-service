import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsOptional()
  end?: string;
}
