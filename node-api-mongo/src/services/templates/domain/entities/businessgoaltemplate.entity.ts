import { BusinessGoalCategory } from "../enums/businessgoal-category.enum";
import { BusinessGoalType } from "../enums/businessgoal-type.enum";

export class BusinessGoalTemplateEntity {
  public businessGoalTemplateId: string;
  public version: string;
  public author: string;
  public lastEditedBy: string;
  public name: string;
  public desc: string;
  public type: BusinessGoalType;
  public category: BusinessGoalCategory;
  public kpiId: string;
  public availablePlanGoalTemplateIds: string[];
  public availablePartnerIds: string[];
  public aiDescription?: string;

  constructor(
    businessGoalTemplateId: string,
    version: string,
    author: string,
    lastEditedBy: string,
    name: string,
    desc: string,
    type: BusinessGoalType,
    category: BusinessGoalCategory,
    kpiId: string,
    availablePlanGoalTemplateIds: string[],
    availablePartnerIds: string[],
    aiDescription?: string,
  ) {
    this.businessGoalTemplateId = businessGoalTemplateId;
    this.version = version;
    this.author = author;
    this.lastEditedBy = lastEditedBy;
    this.name = name;
    this.desc = desc;
    this.type = type;
    this.category = category;
    this.kpiId = kpiId;
    this.availablePlanGoalTemplateIds = availablePlanGoalTemplateIds;
    this.availablePartnerIds = availablePartnerIds;
    this.aiDescription = aiDescription;
  }
}
