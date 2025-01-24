import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PlanService } from "./plan.service";
import {
  IncentiveEntity,
  PlanGoalEntity,
} from "../domain/entities/plangoal.entity";
import { CreatePlanGoalDto } from "./dtos/create-plangoal.dto";
import { PlanEntity } from "../domain/entities/plan.entity";
import { DateStringToDatePipe } from "@src/common/pipes/datestring-to-date.pipe";
import { Status } from "@src/common/enums/status.enum";
import { PlanGoalTemplateService } from "@src/services/templates/api/plangoaltemplate.service";

@Injectable()
export class PlanGoalService {
  constructor(
    private readonly planService: PlanService,
    private readonly templateService: PlanGoalTemplateService,
    private readonly datePipe: DateStringToDatePipe,
  ) {}

  public async getById(
    planId: string,
    planGoalId: string,
  ): Promise<PlanGoalEntity> {
    const plan = await this.planService.getById(planId);
    const planGoal = plan.goals.find((goal) => goal.planGoalId === planGoalId);
    if (!planGoal) {
      throw new NotFoundException(`Plan goal with ID ${planGoalId} not found.`);
    }
    return planGoal;
  }

  public async getAllGoalsOfPlan(planId: string): Promise<PlanGoalEntity[]> {
    const plan = await this.planService.getById(planId);
    if (!plan.goals || plan.goals.length === 0) {
      throw new NotFoundException(`Plan ${planId} contains no Goals.`);
    }
    return plan.goals;
  }

  public async create(
    planId: string,
    templateId: string,
    createDto: CreatePlanGoalDto,
  ): Promise<PlanGoalEntity> {
    const planGoalId = crypto.randomUUID();

    let start: Date;
    let end: Date;
    if (createDto.start && createDto.end) {
      start = this.datePipe.transform(createDto.start);
      end = this.datePipe.transform(createDto.end);
    } else {
      const plan = await this.planService.getById(planId);
      if (!plan.end)
        throw new BadRequestException(
          "End date is required when Plan has no end date for PlanGoal to inherit.",
        );
      start = plan.start;
      end = plan.end;
    }

    const incentive: IncentiveEntity = {
      amount: createDto.incentive.amount,
      type: createDto.incentive.type,
    };

    const template = await this.templateService.getById(templateId);

    const entity = new PlanGoalEntity(
      planGoalId,
      template.planGoalTemplateId,
      template.name,
      template.desc,
      template.category,
      template.activityType,
      template.rule,
      template.ruleTarget,
      template.kpiIds,
      template.partnerIds,
      start,
      end,
      Status.ACTIVE, // TODO: calculate status
      incentive,
      template.eligibilityRule,
    );

    const response: PlanEntity = await this.planService.addPlanGoal(
      planId,
      entity,
    );
    const planGoal = response.goals.find(
      (goal) => goal.planGoalId === planGoalId,
    );
    if (!planGoal) {
      throw new BadRequestException(
        `Failed to create PlanGoal with ID ${planGoalId}.`,
      );
    }
    return planGoal;
  }
}
