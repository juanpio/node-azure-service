import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlanGoalTemplateRepository } from "../../domain/contracts/repositories/plangoaltemplate-repository.interface";
import { PlanGoalTemplateEntity } from "../../domain/entities/plangoaltemplate.entity";
import { PlanGoalTemplateInfraMapper } from "../mappers/plangoaltemplate-infra.mapper";
import {
  PlanGoalTemplateModel,
  PlanGoalTemplateDocument,
} from "../schemas/plangoaltemplate.schema";

@Injectable()
export class PlanGoalTemplateRepositoryImpl
  implements PlanGoalTemplateRepository
{
  constructor(
    @InjectModel(PlanGoalTemplateModel.name)
    private readonly model: Model<PlanGoalTemplateDocument>,
    private readonly mapper: PlanGoalTemplateInfraMapper,
  ) {}

  public async findById(
    planGoalTemplateId: string,
  ): Promise<PlanGoalTemplateEntity> {
    const document = await this.model
      .findOne({ planGoalTemplateId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `PlanGoalTemplate with ID ${planGoalTemplateId} not found.`,
            ),
          ),
      );
    return this.mapper.documentToEntity(document);
  }

  public async findAll(): Promise<PlanGoalTemplateEntity[]> {
    const documents = await this.model
      .find()
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(`No PlanGoalTemplates found.`),
          ),
      );
    return documents.map((document) => this.mapper.documentToEntity(document));
  }

  public async create(
    entity: PlanGoalTemplateEntity,
  ): Promise<PlanGoalTemplateEntity> {
    const planGoalTemplateModel = this.mapper.entityToModel(entity);
    const document = await this.model
      .create(planGoalTemplateModel)
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `Failed to create document with entity: ${entity}`,
            ),
          ),
      );
    return this.mapper.documentToEntity(document);
  }
}
