import { Injectable } from "@nestjs/common";
import { PlanGoalEntity } from "../../domain/entities/plangoal.entity";
import { ViewPlanGoalDto } from "../dtos/view-plangoal.dto";

@Injectable()
export class PlanGoalApiMapper {
  public entityToViewDto(entity: PlanGoalEntity): ViewPlanGoalDto {
    return new ViewPlanGoalDto(
      entity.planGoalId,
      entity.planGoalTemplateId,
      entity.name,
      entity.desc,
      entity.category,
      entity.activityType,
      entity.rule,
      entity.ruleTarget,
      entity.kpiIds,
      entity.partnerIds,
      entity.start,
      entity.end,
      entity.status,
      entity.incentive,
      entity.eligibilityRule,
    );
  }
}
