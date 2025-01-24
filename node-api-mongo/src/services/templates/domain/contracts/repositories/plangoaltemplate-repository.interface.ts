import { PlanGoalTemplateEntity } from "../../entities/plangoaltemplate.entity";

export const PLAN_GOAL_TEMPLATE_REPOSITORY = "PlanGoalTemplateRepository";

export interface PlanGoalTemplateRepository {
  findById(planGoalTemplateId: string): Promise<PlanGoalTemplateEntity>;
  findAll(): Promise<PlanGoalTemplateEntity[]>;
  create(entity: PlanGoalTemplateEntity): Promise<PlanGoalTemplateEntity>;
}
