import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMinSize,
  IsEnum,
  IsNumber,
} from "class-validator";
import { PlanGoalCategory } from "../../domain/enums/plangoal-category.enum";
import { ActivityType } from "../../domain/enums/activitytype.enum";
import { BusinessGoalCategory } from "../../domain/enums/businessgoal-category.enum";

export class CreatePlanGoalTemplateDto {
  @IsString()
  @IsNotEmpty()
  public planGoalTemplateId: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public desc: string;

  @IsEnum(PlanGoalCategory)
  @IsNotEmpty()
  public category: PlanGoalCategory;

  @IsEnum(ActivityType)
  @IsNotEmpty()
  public activityType: ActivityType;

  @IsString()
  @IsNotEmpty()
  public rule: string;

  @IsNumber()
  @IsNotEmpty()
  public ruleTarget: number;

  @IsEnum(BusinessGoalCategory)
  @IsNotEmpty()
  public businessGoalCategory: BusinessGoalCategory;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  public kpiIds: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  public partnerIds: string[];

  @IsString()
  @IsOptional()
  public eligibilityRule?: string;
}
