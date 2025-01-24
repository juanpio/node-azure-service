import { BusinessGoalTemplateEntity } from "../../domain/entities/businessgoaltemplate.entity";
import { ViewBusinessGoalTemplateDto } from "../dtos/view-businessgoaltemplate.dto";

export class BusinessGoalTemplateApiMapper {
  public entityToViewDto(
    entity: BusinessGoalTemplateEntity,
  ): ViewBusinessGoalTemplateDto {
    return new ViewBusinessGoalTemplateDto(
      entity.businessGoalTemplateId,
      entity.version,
      entity.author,
      entity.lastEditedBy,
      entity.name,
      entity.desc,
      entity.type,
      entity.category,
      entity.kpiId,
      entity.availablePlanGoalTemplateIds,
      entity.availablePartnerIds,
      entity.aiDescription,
    );
  }
}
