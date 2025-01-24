import { Injectable, Inject } from "@nestjs/common";
import {
  PLAN_GOAL_TEMPLATE_REPOSITORY,
  PlanGoalTemplateRepository,
} from "../domain/contracts/repositories/plangoaltemplate-repository.interface";
import { PlanGoalTemplateEntity } from "../domain/entities/plangoaltemplate.entity";
import { CreatePlanGoalTemplateDto } from "./dtos/create-plangoaltemplate.dto";

@Injectable()
export class PlanGoalTemplateService {
  constructor(
    @Inject(PLAN_GOAL_TEMPLATE_REPOSITORY)
    private readonly repository: PlanGoalTemplateRepository,
  ) {}

  public async getById(
    planGoalTemplateId: string,
  ): Promise<PlanGoalTemplateEntity> {
    return await this.repository.findById(planGoalTemplateId);
  }

  public async getAllPlanGoalTemplates(): Promise<PlanGoalTemplateEntity[]> {
    return await this.repository.findAll();
  }

  public async create(
    createDto: CreatePlanGoalTemplateDto,
  ): Promise<PlanGoalTemplateEntity> {
    const version = "1.0";
    const author = "Luke";
    const lastEditedBy = "Juan";

    const entity = new PlanGoalTemplateEntity(
      createDto.planGoalTemplateId,
      version,
      author,
      lastEditedBy,
      createDto.name,
      createDto.desc,
      createDto.category,
      createDto.activityType,
      createDto.rule,
      createDto.ruleTarget,
      createDto.businessGoalCategory,
      createDto.kpiIds,
      createDto.partnerIds,
      createDto.eligibilityRule,
    );
    return await this.repository.create(entity);
  }
}
