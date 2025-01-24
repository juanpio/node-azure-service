import { BusinessGoalTemplateEntity } from "../../domain/entities/businessgoaltemplate.entity";
import {
  BusinessGoalTemplateModel,
  BusinessGoalTemplateDocument,
} from "../schemas/businessgoaltemplate.schema";

export class BusinessGoalTemplateInfraMapper {
  public entityToModel(
    entity: BusinessGoalTemplateEntity
  ): BusinessGoalTemplateModel {
    return {
      businessGoalTemplateId: entity.businessGoalTemplateId,
      version: entity.version,
      author: entity.author,
      lastEditedBy: entity.lastEditedBy,
      name: entity.name,
      desc: entity.desc,
      type: entity.type,
      category: entity.category,
      kpiId: entity.kpiId,
      availablePlanGoalTemplateIds: entity.availablePlanGoalTemplateIds,
      availablePartnerIds: entity.availablePartnerIds,
      aiDescription: entity.aiDescription,
    };
  }

  public documentToEntity(
    document: BusinessGoalTemplateDocument
  ): BusinessGoalTemplateEntity {
    return new BusinessGoalTemplateEntity(
      document.businessGoalTemplateId,
      document.version,
      document.author,
      document.lastEditedBy,
      document.name,
      document.desc,
      document.type,
      document.category,
      document.kpiId,
      document.availablePlanGoalTemplateIds,
      document.availablePartnerIds,
      document.aiDescription
    );
  }
}
