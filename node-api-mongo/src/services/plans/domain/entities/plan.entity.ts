import { Status } from "@src/common/enums/status.enum";
import { PlanGoalEntity } from "./plangoal.entity";

export class PlanEntity {
  public planId: string;
  public clientId: string;
  public programId: string;
  public name: string;
  public desc: string;
  public start: Date;
  public end: Date;
  public status: Status;
  public budget: number;
  public maxMemberPayout: number;
  public goals: PlanGoalEntity[];

  constructor(
    planId: string,
    clientId: string,
    programId: string,
    name: string,
    desc: string,
    start: Date,
    end: Date,
    status: Status,
    budget: number,
    maxMemberPayout: number,
    goals: PlanGoalEntity[],
  ) {
    this.planId = planId;
    this.clientId = clientId;
    this.programId = programId;
    this.name = name;
    this.desc = desc;
    this.start = start;
    this.end = end;
    this.status = status;
    this.budget = budget;
    this.maxMemberPayout = maxMemberPayout;
    this.goals = goals;
  }
}
