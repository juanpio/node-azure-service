import { Injectable, Inject } from "@nestjs/common";
import { PlanGoalEntity } from "../domain/entities/plangoal.entity";
import { CreatePlanDto } from "./dtos/create-plan.dto";
import { Status } from "@src/common/enums/status.enum";
import { DateStringToDatePipe } from "@src/common/pipes/datestring-to-date.pipe";
import {
  PLAN_REPOSITORY,
  PlanRepository,
} from "../domain/contracts/repositories/plan-repository.interface";
import { PlanEntity } from "../domain/entities/plan.entity";

@Injectable()
export class PlanService {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly repository: PlanRepository,
    private readonly datePipe: DateStringToDatePipe,
  ) {}

  public async getById(planId: string): Promise<PlanEntity> {
    return await this.repository.findById(planId);
  }

  public async getAllPlansOfProgram(programId: string): Promise<PlanEntity[]> {
    return await this.repository.findAllOfProgram(programId);
  }

  public async create(
    programId: string,
    createDto: CreatePlanDto,
  ): Promise<PlanEntity> {
    const clientId = "EXMPLCompanyUSA";
    const planId = crypto.randomUUID();
    const start = this.datePipe.transform(createDto.start);
    const end = this.datePipe.transform(createDto.end);
    const entity = new PlanEntity(
      planId,
      clientId,
      programId,
      createDto.name,
      createDto.desc,
      start,
      end,
      Status.ACTIVE,
      createDto.budget,
      createDto.maxMemberPayout,
      [],
    );
    return await this.repository.create(entity);
  }

  public async addPlanGoal(
    planId: string,
    entity: PlanGoalEntity,
  ): Promise<PlanEntity> {
    return await this.repository.addPlanGoal(planId, entity);
  }
}
