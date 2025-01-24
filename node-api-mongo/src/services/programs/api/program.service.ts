import { Injectable, Inject } from "@nestjs/common";
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
} from "../domain/contracts/repositories/program-repository.interface";
import { ProgramEntity } from "../domain/entities/program.entity";
import { Status } from "@src/common/enums/status.enum";
import { DateStringToDatePipe } from "@src/common/pipes/datestring-to-date.pipe";
import { CreateProgramDto } from "./dtos/create-program.dto";
import { BusinessGoalEntity } from "../domain/entities/businessgoal.entity";

@Injectable()
export class ProgramService {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly repository: ProgramRepository,
    private readonly datePipe: DateStringToDatePipe,
  ) {}

  public async getById(programId: string): Promise<ProgramEntity> {
    return await this.repository.findById(programId);
  }

  public async getAllProgramsOfClient(
    clientId: string,
  ): Promise<ProgramEntity[]> {
    return await this.repository.findAllOfClient(clientId);
  }

  public async create(createDto: CreateProgramDto): Promise<ProgramEntity> {
    const clientId = "EXMPLCompanyUSA";
    const programId = crypto.randomUUID();
    const start = this.datePipe.transform(createDto.start);
    const end = this.datePipe.transform(createDto.end);
    const entity = new ProgramEntity(
      programId,
      clientId,
      createDto.name,
      createDto.desc,
      [],
      [],
      Status.ACTIVE,
      start,
      end,
    );
    return await this.repository.create(entity);
  }

  public async addBusinessGoal(
    programId: string,
    businessGoal: BusinessGoalEntity,
  ): Promise<ProgramEntity> {
    return await this.repository.addBusinessGoal(programId, businessGoal);
  }
}
