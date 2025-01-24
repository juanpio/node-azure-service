import { PlanGoalTemplateEntity } from "../../domain/entities/plangoaltemplate.entity";
import { ViewPlanGoalTemplateDto } from "../dtos/view-plangoaltemplate.dto";

export class PlanGoalTemplateApiMapper {
  public entityToViewDto(
    entity: PlanGoalTemplateEntity,
  ): ViewPlanGoalTemplateDto {
    return new ViewPlanGoalTemplateDto(
      entity.planGoalTemplateId,
      entity.version,
      entity.author,
      entity.lastEditedBy,
      entity.name,
      entity.desc,
      entity.category,
      entity.activityType,
      entity.rule,
      entity.ruleTarget,
      entity.businessGoalCategory,
      entity.kpiIds,
      entity.partnerIds,
      entity.eligibilityRule,
    );
  }
}
