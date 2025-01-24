import { Injectable } from "@nestjs/common";
import { BusinessGoalEntity } from "../../domain/entities/businessgoal.entity";
import { ViewBusinessGoalDto } from "../dtos/view-businessgoal.dto";

@Injectable()
export class BusinessGoalApiMapper {
  public entityToViewDto(entity: BusinessGoalEntity): ViewBusinessGoalDto {
    return new ViewBusinessGoalDto(
      entity.businessGoalId,
      entity.businessGoalTemplateId,
      entity.name,
      entity.desc,
      entity.type,
      entity.category,
      entity.kpiId,
      entity.start,
      entity.end,
      entity.status,
      entity.target,
      entity.aiDescription,
    );
  }
}
