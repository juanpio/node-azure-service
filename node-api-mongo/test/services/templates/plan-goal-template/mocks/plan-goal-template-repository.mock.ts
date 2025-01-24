import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BusinessGoalCategory } from "@src/services/template/plan-goal/domain/enums/business-goal-category.enum";
import { PlanGoalTemplate } from "@src/services/template/plan-goal/domain/entities";
import {
  PlanGoalTemplateCategory,
  ActivityType,
} from "@src/services/template/plan-goal/domain/enums";
import { PlanGoalTemplateRepository } from "@src/services/template/plan-goal/infrastructure/repositories/plan-goal-template.repository";
import { PlanGoalTemplateDocument } from "@src/services/template/plan-goal/infrastructure/schemas/plan-goal-template.schema";
import { Model } from "mongoose";

@Injectable()
export class PlanGoalTemplateRepositoryMockImpl
  implements PlanGoalTemplateRepository
{
  constructor(
    @InjectModel("PlanGoalTemplate")
    private readonly planGoalTemplateModel: Model<PlanGoalTemplateDocument>,
  ) {}

  public async create(
    planGoalTemplate: PlanGoalTemplate,
  ): Promise<PlanGoalTemplate> {
    return await Promise.resolve(planGoalTemplate);
  }

  public async find(_id: string): Promise<PlanGoalTemplate | null> {
    const kpiIds = [];
    const partnerIds = [];
    const eligibilityRule = '{"member_id": "ABC123","age":"45"}';
    kpiIds.push("kpi_123");
    partnerIds.push("partner1");
    return new PlanGoalTemplate(
      _id,
      "0.1",
      "john doe",
      "john smith",
      "Mocked Plan",
      "This is a mocked Plan",
      PlanGoalTemplateCategory.Preventive,
      ActivityType.AnnualWellnessScreening,
      "rule",
      123,
      BusinessGoalCategory.ConditionManagement,
      kpiIds,
      partnerIds,
      eligibilityRule,
    );
  }
}
