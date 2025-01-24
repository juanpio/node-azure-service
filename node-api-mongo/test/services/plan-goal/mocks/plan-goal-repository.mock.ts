import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  PlanGoalEntity,
  Incentive,
  PlanGoalStatus,
  IncentiveType,
} from "../../../../src/services/plan-goal/domain/entities";
import { PlanGoalRepository } from "../../../../src/services/plan-goal/domain/repositories/plan-goal.repository.interface";
import { PlanGoalDocument } from "../../../../src/services/plan-goal/infraestructure/schemas/plan-goal.schema";

@Injectable()
export class PlanGoalRepositoryMockImpl implements PlanGoalRepository {
  constructor(
    @InjectModel("PlanGoal")
    private readonly planGoalModel: Model<PlanGoalDocument>,
  ) {}

  public async create(planGoal: PlanGoalEntity): Promise<void> {
    return await Promise.resolve();
  }

  public async find(_id: string): Promise<PlanGoalEntity | null> {
    let incentive = {
      amount: 100,
      type: IncentiveType.Cash,
    } as Incentive;
    return new PlanGoalEntity("123", "1234", PlanGoalStatus.Active, incentive);
  }
}
