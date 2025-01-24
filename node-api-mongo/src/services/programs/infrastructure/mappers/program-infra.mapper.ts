import { Injectable } from "@nestjs/common";
import { ProgramEntity } from "../../domain/entities/program.entity";
import { ProgramDocument, ProgramModel } from "../schemas/program.schema";
import { BusinessGoalInfraMapper } from "./businessgoal-infra.mapper";

@Injectable()
export class ProgramInfraMapper {
  constructor(private readonly businessGoalMapper: BusinessGoalInfraMapper) {}

  public entityToModel(entity: ProgramEntity): ProgramModel {
    let businessGoals = [];
    if (entity?.businessGoals && entity.businessGoals.length > 0)
      businessGoals = entity.businessGoals.map((businessGoal) =>
        this.businessGoalMapper.entityToModel(businessGoal),
      );

    return {
      programId: entity.programId,
      clientId: entity.clientId,
      name: entity.name,
      desc: entity.desc,
      businessGoals,
      businessGoalPriority: entity.businessGoalPriority,
      status: entity.status,
      start: entity.start,
      end: entity.end,
    };
  }

  public documentToEntity(document: ProgramDocument): ProgramEntity {
    return new ProgramEntity(
      document.programId,
      document.clientId,
      document.name,
      document.desc,
      document.businessGoals,
      document.businessGoalPriority,
      document.status,
      document.start,
      document.end,
    );
  }
}
