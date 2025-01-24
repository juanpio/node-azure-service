import { Injectable } from "@nestjs/common";
import { PlanGoalApiMapper } from "./plangoal-api.mapper";
import { ViewPlanDto } from "../dtos/view-plan.dto";
import { PlanEntity } from "../../domain/entities/plan.entity";

@Injectable()
export class PlanApiMapper {
  constructor(private readonly planGoalMapper: PlanGoalApiMapper) {}

  public entityToViewDto(entity: PlanEntity): ViewPlanDto {
    let planGoals = [];
    if (entity?.goals && entity.goals.length > 0)
      planGoals = entity.goals.map((planGoal) =>
        this.planGoalMapper.entityToViewDto(planGoal),
      );

    return new ViewPlanDto(
      entity.planId,
      entity.clientId,
      entity.programId,
      entity.name,
      entity.desc,
      entity.start,
      entity.end,
      entity.status,
      entity.budget,
      entity.maxMemberPayout,
      planGoals,
    );
  }
}
