import { Injectable } from "@nestjs/common";
import { PlanDocument, PlanModel } from "../schemas/plan.schema";
import { PlanGoalInfraMapper } from "./plangoal-infra.mapper";
import { PlanEntity } from "../../domain/entities/plan.entity";

@Injectable()
export class PlanInfraMapper {
  constructor(private readonly planGoalMapper: PlanGoalInfraMapper) {}

  public entityToModel(entity: PlanEntity): PlanModel {
    let planGoals = [];
    if (entity?.goals && entity.goals.length > 0)
      planGoals = entity.goals.map((planGoal) =>
        this.planGoalMapper.entityToModel(planGoal),
      );

    return {
      planId: entity.planId,
      clientId: entity.clientId,
      programId: entity.programId,
      name: entity.name,
      desc: entity.desc,
      start: entity.start,
      end: entity.end,
      status: entity.status,
      budget: entity.budget,
      maxMemberPayout: entity.maxMemberPayout,
      goals: planGoals,
    };
  }

  public documentToEntity(document: PlanDocument): PlanEntity {
    return new PlanEntity(
      document.planId,
      document.clientId,
      document.programId,
      document.name,
      document.desc,
      document.start,
      document.end,
      document.status,
      document.budget,
      document.maxMemberPayout,
      document.goals,
    );
  }
}
