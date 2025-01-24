import { Injectable } from "@nestjs/common";
import { PlanGoalModel } from "../schemas/plan.schema";
import { PlanGoalEntity } from "../../domain/entities/plangoal.entity";

@Injectable()
export class PlanGoalInfraMapper {
  public entityToModel(entity: PlanGoalEntity): PlanGoalModel {
    return {
      planGoalId: entity.planGoalId,
      planGoalTemplateId: entity.planGoalTemplateId,
      name: entity.name,
      desc: entity.desc,
      category: entity.category,
      activityType: entity.activityType,
      rule: entity.rule,
      ruleTarget: entity.ruleTarget,
      kpiIds: entity.kpiIds,
      partnerIds: entity.partnerIds,
      start: entity.start,
      end: entity.end,
      status: entity.status,
      incentive: entity.incentive,
      eligibilityRule: entity.eligibilityRule,
    };
  }
}
