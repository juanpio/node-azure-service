import { Status } from "@src/common/enums/status.enum";
import { IncentiveType } from "../enums/incentivetype.enum";
import { ActivityType } from "@src/services/templates/domain/enums/activitytype.enum";
import { PlanGoalCategory } from "@src/services/templates/domain/enums/plangoal-category.enum";

export class IncentiveEntity {
  amount: number;
  type: IncentiveType;
}

export class PlanGoalEntity {
  public planGoalId: string;
  public planGoalTemplateId: string;
  public name: string;
  public desc: string;
  public category: PlanGoalCategory;
  public activityType: ActivityType;
  public rule: string;
  public ruleTarget: number;
  public kpiIds: string[];
  public partnerIds: string[];
  public start: Date;
  public end: Date;
  public status: Status;
  public incentive: IncentiveEntity;
  public eligibilityRule?: string;

  constructor(
    planGoalId: string,
    planGoalTemplateId: string,
    name: string,
    desc: string,
    category: PlanGoalCategory,
    activityType: ActivityType,
    rule: string,
    ruleTarget: number,
    kpiIds: string[],
    partnerIds: string[],
    start: Date,
    end: Date,
    status: Status,
    incentive: IncentiveEntity,
    eligibilityRule?: string,
  ) {
    this.planGoalId = planGoalId;
    this.planGoalTemplateId = planGoalTemplateId;
    this.name = name;
    this.desc = desc;
    this.category = category;
    this.activityType = activityType;
    this.rule = rule;
    this.ruleTarget = ruleTarget;
    this.kpiIds = kpiIds;
    this.partnerIds = partnerIds;
    this.start = start;
    this.end = end;
    this.status = status;
    this.incentive = incentive;
    this.eligibilityRule = eligibilityRule;
  }
}
