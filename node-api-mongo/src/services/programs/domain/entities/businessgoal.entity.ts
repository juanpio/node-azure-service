import { Status } from "@src/common/enums/status.enum";
import { UnitOfMeasure } from "../enums/unitofmeasure.enum";
import { BusinessGoalType } from "@src/services/templates/domain/enums/businessgoal-type.enum";
import { BusinessGoalCategory } from "@src/services/templates/domain/enums/businessgoal-category.enum";

export class BusinessGoalTargetEntity {
  value: number;
  unitOfMeasure: UnitOfMeasure;
}

export class BusinessGoalEntity {
  public businessGoalId: string;
  public businessGoalTemplateId: string;
  public name: string;
  public desc: string;
  public type: BusinessGoalType;
  public category: BusinessGoalCategory;
  public kpiId: string;
  public start: Date;
  public end: Date;
  public status: Status;
  public target?: BusinessGoalTargetEntity;
  public aiDescription?: string;

  constructor(
    businessGoalId: string,
    businessGoalTemplateId: string,
    name: string,
    desc: string,
    type: BusinessGoalType,
    category: BusinessGoalCategory,
    kpiId: string,
    start: Date,
    end: Date,
    status: Status,
    target?: BusinessGoalTargetEntity,
    aiDescription?: string,
  ) {
    this.businessGoalId = businessGoalId;
    this.businessGoalTemplateId = businessGoalTemplateId;
    this.name = name;
    this.desc = desc;
    this.type = type;
    this.category = category;
    this.kpiId = kpiId;
    this.start = start;
    this.end = end;
    this.status = status;
    this.target = target;
    this.aiDescription = aiDescription;
  }
}
