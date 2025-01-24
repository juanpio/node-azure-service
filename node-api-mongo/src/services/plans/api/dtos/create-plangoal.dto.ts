import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { IncentiveType } from "../../domain/enums/incentivetype.enum";

class CreateIncentiveDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(IncentiveType)
  @IsNotEmpty()
  type: IncentiveType;
}

export class CreatePlanGoalDto {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  end: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateIncentiveDto)
  incentive: CreateIncentiveDto;
}
