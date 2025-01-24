import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BusinessGoalTemplateRepository } from "../../domain/contracts/repositories/businessgoaltemplate-repository.interface";
import { BusinessGoalTemplateEntity } from "../../domain/entities/businessgoaltemplate.entity";
import { BusinessGoalTemplateInfraMapper } from "../mappers/businessgoaltemplate-infra.mapper";
import {
  BusinessGoalTemplateModel,
  BusinessGoalTemplateDocument,
} from "../schemas/businessgoaltemplate.schema";

@Injectable()
export class BusinessGoalTemplateRepositoryImpl
  implements BusinessGoalTemplateRepository
{
  constructor(
    @InjectModel(BusinessGoalTemplateModel.name)
    private readonly model: Model<BusinessGoalTemplateDocument>,
    private readonly mapper: BusinessGoalTemplateInfraMapper,
  ) {}

  public async findById(
    businessGoalTemplateId: string,
  ): Promise<BusinessGoalTemplateEntity> {
    const document = await this.model
      .findOne({ businessGoalTemplateId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `BusinessGoalTemplate with ID ${businessGoalTemplateId} not found.`,
            ),
          ),
      );
    return this.mapper.documentToEntity(document);
  }

  public async findAll(): Promise<BusinessGoalTemplateEntity[]> {
    const documents = await this.model
      .find()
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(`No BusinessGoalTemplates found.`),
          ),
      );
    return documents.map((document) => this.mapper.documentToEntity(document));
  }

  public async create(
    entity: BusinessGoalTemplateEntity,
  ): Promise<BusinessGoalTemplateEntity> {
    const businessGoalTemplateModel = this.mapper.entityToModel(entity);
    const document = await this.model
      .create(businessGoalTemplateModel)
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
