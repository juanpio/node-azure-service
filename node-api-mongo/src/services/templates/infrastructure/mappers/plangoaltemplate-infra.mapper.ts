import { PlanGoalTemplateEntity } from "../../domain/entities/plangoaltemplate.entity";
import {
  PlanGoalTemplateDocument,
  PlanGoalTemplateModel,
} from "../schemas/plangoaltemplate.schema";

export class PlanGoalTemplateInfraMapper {
  public entityToModel(entity: PlanGoalTemplateEntity): PlanGoalTemplateModel {
    return {
      planGoalTemplateId: entity.planGoalTemplateId,
      version: entity.version,
      author: entity.author,
      lastEditedBy: entity.lastEditedBy,
      name: entity.name,
      desc: entity.desc,
      category: entity.category,
      activityType: entity.activityType,
      rule: entity.rule,
      ruleTarget: entity.ruleTarget,
      businessGoalCategory: entity.businessGoalCategory,
      kpiIds: entity.kpiIds,
      partnerIds: entity.partnerIds,
      eligibilityRule: entity.eligibilityRule,
    };
  }

  public documentToEntity(
    document: PlanGoalTemplateDocument,
  ): PlanGoalTemplateEntity {
    return new PlanGoalTemplateEntity(
      document.planGoalTemplateId,
      document.version,
      document.author,
      document.lastEditedBy,
      document.name,
      document.desc,
      document.category,
      document.activityType,
      document.rule,
      document.ruleTarget,
      document.businessGoalCategory,
      document.kpiIds,
      document.partnerIds,
      document.eligibilityRule,
    );
  }
}