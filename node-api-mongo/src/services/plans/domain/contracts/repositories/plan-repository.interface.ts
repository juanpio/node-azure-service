import { PlanGoalEntity } from "../../entities/plangoal.entity";
import { PlanEntity } from "../../entities/plan.entity";

export const PLAN_REPOSITORY = "PlanRepository";

export interface PlanRepository {
  findById(planId: string): Promise<PlanEntity>;
  findAllOfProgram(programId: string): Promise<PlanEntity[]>;
  create(entity: PlanEntity): Promise<PlanEntity>;
  addPlanGoal(planId: string, planGoal: PlanGoalEntity): Promise<PlanEntity>;
}
