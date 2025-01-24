import { Injectable } from "@nestjs/common";
import { ProgramEntity } from "../../domain/entities/program.entity";
import { ViewProgramDto } from "../dtos/view-program.dto";
import { BusinessGoalApiMapper } from "./businessgoal-api.mapper";

@Injectable()
export class ProgramApiMapper {
  constructor(private readonly businessGoalApiMapper: BusinessGoalApiMapper) {}

  public entityToViewDto(entity: ProgramEntity): ViewProgramDto {
    let businessGoals = [];
    if (entity?.businessGoals && entity.businessGoals.length > 0)
      businessGoals = entity.businessGoals.map((businessGoal) =>
        this.businessGoalApiMapper.entityToViewDto(businessGoal),
      );

    return new ViewProgramDto(
      entity.programId,
      entity.clientId,
      entity.name,
      entity.desc,
      businessGoals,
      entity.businessGoalPriority,
      entity.status,
      entity.start,
      entity.end,
    );
  }
}
