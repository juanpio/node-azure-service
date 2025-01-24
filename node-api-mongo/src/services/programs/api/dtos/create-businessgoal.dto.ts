import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { UnitOfMeasure } from "../../domain/enums/unitofmeasure.enum";
import { Type } from "class-transformer";

class CreateBusinessGoalTargetDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsEnum(UnitOfMeasure)
  @IsNotEmpty()
  unitOfMeasure: UnitOfMeasure;
}

export class CreateBusinessGoalDto {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsOptional()
  end?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBusinessGoalTargetDto)
  target?: CreateBusinessGoalTargetDto;
}
