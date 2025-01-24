import { Injectable } from "@nestjs/common";
import { BusinessGoalEntity } from "../../domain/entities/businessgoal.entity";
import { BusinessGoalModel } from "../schemas/program.schema";

@Injectable()
export class BusinessGoalInfraMapper {
  public entityToModel(entity: BusinessGoalEntity): BusinessGoalModel {
    return {
      businessGoalId: entity.businessGoalId,
      businessGoalTemplateId: entity.businessGoalTemplateId,
      name: entity.name,
      desc: entity.desc,
      type: entity.type,
      category: entity.category,
      kpiId: entity.kpiId,
      start: entity.start,
      end: entity.end,
      status: entity.status,
      target: entity.target,
      aiDescription: entity.aiDescription,
    };
  }
}
