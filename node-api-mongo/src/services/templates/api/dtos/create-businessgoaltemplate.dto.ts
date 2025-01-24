import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMinSize,
  IsEnum,
} from "class-validator";
import { BusinessGoalCategory } from "../../domain/enums/businessgoal-category.enum";
import { BusinessGoalType } from "../../domain/enums/businessgoal-type.enum";

export class CreateBusinessGoalTemplateDto {
  @IsString()
  @IsNotEmpty()
  public businessGoalTemplateId: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public desc: string;

  @IsEnum(BusinessGoalType)
  @IsNotEmpty()
  public type: BusinessGoalType;

  @IsEnum(BusinessGoalCategory)
  @IsNotEmpty()
  public category: BusinessGoalCategory;

  @IsString()
  @IsNotEmpty()
  public kpiId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  public availablePlanGoalTemplateIds: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  public availablePartnerIds: string[];

  @IsString()
  @IsOptional()
  public aiDescription?: string;
}
