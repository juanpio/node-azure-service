import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProgramService } from "./program.service";
import {
  BusinessGoalEntity,
  BusinessGoalTargetEntity,
} from "../domain/entities/businessgoal.entity";
import { CreateBusinessGoalDto } from "./dtos/create-businessgoal.dto";
import { ProgramEntity } from "../domain/entities/program.entity";
import { DateStringToDatePipe } from "@src/common/pipes/datestring-to-date.pipe";
import { Status } from "@src/common/enums/status.enum";
import { BusinessGoalTemplateService } from "@src/services/templates/api/businessgoaltemplate.service";

@Injectable()
export class BusinessGoalService {
  constructor(
    private readonly programService: ProgramService,
    private readonly templateService: BusinessGoalTemplateService,
    private readonly datePipe: DateStringToDatePipe,
  ) {}

  public async getById(
    programId: string,
    businessGoalId: string,
  ): Promise<BusinessGoalEntity> {
    const program = await this.programService.getById(programId);
    const businessGoal = program.businessGoals.find(
      (goal) => goal.businessGoalId === businessGoalId,
    );
    if (!businessGoal) {
      throw new NotFoundException(
        `Business goal with ID ${businessGoalId} not found.`,
      );
    }
    return businessGoal;
  }

  public async getAllBusinessGoalsOfProgram(
    programId: string,
  ): Promise<BusinessGoalEntity[]> {
    const program = await this.programService.getById(programId);
    if (!program.businessGoals) {
      throw new NotFoundException(
        `Program ${programId} contains no BusinessGoals.`,
      );
    }
    return program.businessGoals;
  }

  public async create(
    programId: string,
    templateId: string,
    createDto: CreateBusinessGoalDto,
  ): Promise<BusinessGoalEntity> {
    const businessGoalId = crypto.randomUUID();

    let start: Date;
    let end: Date;
    if (createDto.start && createDto.end) {
      start = this.datePipe.transform(createDto.start);
      end = this.datePipe.transform(createDto.end);
    } else {
      const program = await this.programService.getById(programId);
      if (!program.end)
        throw new BadRequestException(
          "End date is required when Program has no end date for BusinessGoal to inherit.",
        );
      start = program.start;
      end = program.end;
    }

    const target: BusinessGoalTargetEntity = createDto.target
      ? {
          value: createDto.target.value,
          unitOfMeasure: createDto.target.unitOfMeasure,
        }
      : undefined;

    const template = await this.templateService.getById(templateId);

    const entity = new BusinessGoalEntity(
      businessGoalId,
      template.businessGoalTemplateId,
      template.name,
      template.desc,
      template.type,
      template.category,
      template.kpiId,
      start,
      end,
      Status.ACTIVE, // TODO: calculate status
      target,
      template.aiDescription,
    );

    const response: ProgramEntity = await this.programService.addBusinessGoal(
      programId,
      entity,
    );
    const businessGoal = response.businessGoals.find(
      (goal) => goal.businessGoalId === businessGoalId,
    );
    if (!businessGoal) {
      throw new BadRequestException(
        `Failed to create BusinessGoal with ID ${businessGoalId}.`,
      );
    }
    return businessGoal;
  }
}
