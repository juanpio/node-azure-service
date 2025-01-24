import { IsString, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePlanDto {
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
  @IsNotEmpty()
  end: string;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsNumber()
  @IsNotEmpty()
  maxMemberPayout: number;
}
