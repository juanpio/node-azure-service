import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlanRepository } from "../../domain/contracts/repositories/plan-repository.interface";
import { PlanDocument, PlanModel } from "../schemas/plan.schema";
import { PlanEntity } from "../../domain/entities/plan.entity";
import { PlanInfraMapper } from "../mappers/plan-infra.mapper";
import { PlanGoalEntity } from "../../domain/entities/plangoal.entity";
import { PlanGoalInfraMapper } from "../mappers/plangoal-infra.mapper";

@Injectable()
export class PlanRepositoryImpl implements PlanRepository {
  constructor(
    @InjectModel(PlanModel.name)
    private readonly model: Model<PlanDocument>,
    private readonly planMapper: PlanInfraMapper,
    private readonly planGoalMapper: PlanGoalInfraMapper,
  ) {}

  public async findById(planId: string): Promise<PlanEntity> {
    const document = await this.model
      .findOne({ planId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(`Plan with ID ${planId} not found.`),
          ),
      );
    return this.planMapper.documentToEntity(document);
  }

  public async findAllOfProgram(programId: string): Promise<PlanEntity[]> {
    const documents = await this.model
      .find({ programId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `No Plans with Program ID ${programId} found.`,
            ),
          ),
      );
    return documents.map((document) =>
      this.planMapper.documentToEntity(document),
    );
  }

  public async create(entity: PlanEntity): Promise<PlanEntity> {
    const planModel = this.planMapper.entityToModel(entity);
    const document = await this.model
      .create(planModel)
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `Failed to create document with entity: ${entity}`,
            ),
          ),
      );
    return this.planMapper.documentToEntity(document);
  }

  public async addPlanGoal(
    planId: string,
    entity: PlanGoalEntity,
  ): Promise<PlanEntity> {
    const planGoalModel = this.planGoalMapper.entityToModel(entity);
    await this.model.updateOne(
      { planId },
      {
        $push: {
          goals: planGoalModel,
        },
      },
    );

    const document = await this.model
      .findOne({ planId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `Failed to create document with entity: ${entity}`,
            ),
          ),
      );
    return this.planMapper.documentToEntity(document);
  }
}
