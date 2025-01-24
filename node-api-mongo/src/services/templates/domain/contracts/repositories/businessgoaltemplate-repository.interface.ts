import { BusinessGoalTemplateEntity } from "../../entities/businessgoaltemplate.entity";

export const BUSINESS_GOAL_TEMPLATE_REPOSITORY =
  "BusinessGoalTemplateRepository";

export interface BusinessGoalTemplateRepository {
  findById(businessGoalTemplateId: string): Promise<BusinessGoalTemplateEntity>;
  findAll(): Promise<BusinessGoalTemplateEntity[]>;
  create(
    entity: BusinessGoalTemplateEntity,
  ): Promise<BusinessGoalTemplateEntity>;
}
