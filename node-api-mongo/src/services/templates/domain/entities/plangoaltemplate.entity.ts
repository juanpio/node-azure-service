import { ActivityType } from "../enums/activitytype.enum";
import { BusinessGoalCategory } from "../enums/businessgoal-category.enum";
import { PlanGoalCategory } from "../enums/plangoal-category.enum";

export class PlanGoalTemplateEntity {
  public planGoalTemplateId: string;
  public version: string;
  public author: string;
  public lastEditedBy: string;
  public name: string;
  public desc: string;
  public category: PlanGoalCategory;
  public activityType: ActivityType;
  public rule: string;
  public ruleTarget: number;
  public businessGoalCategory: BusinessGoalCategory;
  public kpiIds: string[];
  public partnerIds: string[];
  public eligibilityRule?: string;

  constructor(
    planGoalTemplateId: string,
    version: string,
    author: string,
    lastEditedBy: string,
    name: string,
    desc: string,
    category: PlanGoalCategory,
    activityType: ActivityType,
    rule: string,
    ruleTarget: number,
    businessGoalCategory: BusinessGoalCategory,
    kpiIds: string[],
    partnerIds: string[],
    eligibilityRule?: string,
  ) {
    this.planGoalTemplateId = planGoalTemplateId;
    this.version = version;
    this.author = author;
    this.lastEditedBy = lastEditedBy;
    this.name = name;
    this.desc = desc;
    this.category = category;
    this.activityType = activityType;
    this.rule = rule;
    this.ruleTarget = ruleTarget;
    this.businessGoalCategory = businessGoalCategory;
    this.kpiIds = kpiIds;
    this.partnerIds = partnerIds;
    this.eligibilityRule = eligibilityRule;
  }
}
