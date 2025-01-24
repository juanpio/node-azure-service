import { BusinessGoalEntity } from "../../entities/businessgoal.entity";
import { ProgramEntity } from "../../entities/program.entity";

export const PROGRAM_REPOSITORY = "ProgramRepository";

export interface ProgramRepository {
  findById(programId: string): Promise<ProgramEntity>;
  findAllOfClient(clientId: string): Promise<ProgramEntity[]>;
  create(entity: ProgramEntity): Promise<ProgramEntity>;
  addBusinessGoal(
    programId: string,
    businessGoal: BusinessGoalEntity,
  ): Promise<ProgramEntity>;
}
