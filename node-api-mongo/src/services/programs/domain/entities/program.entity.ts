import { Status } from "@src/common/enums/status.enum";
import { BusinessGoalEntity } from "./businessgoal.entity";

export class ProgramEntity {
  public programId: string;
  public clientId: string;
  public name: string;
  public desc: string;
  public businessGoals: BusinessGoalEntity[];
  public businessGoalPriority: string[];
  public status: Status;
  public start: Date;
  public end?: Date;

  constructor(
    programId: string,
    clientId: string,
    name: string,
    desc: string,
    businessGoals: BusinessGoalEntity[],
    businessGoalPriority: string[],
    status: Status,
    start: Date,
    end?: Date,
  ) {
    this.programId = programId;
    this.clientId = clientId;
    this.name = name;
    this.desc = desc;
    this.businessGoals = businessGoals;
    this.businessGoalPriority = businessGoalPriority;
    this.status = status;
    this.start = start;
    this.end = end;
  }
}
