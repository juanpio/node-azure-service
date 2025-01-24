import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProgramRepository } from "../../domain/contracts/repositories/program-repository.interface";
import { ProgramDocument, ProgramModel } from "../schemas/program.schema";
import { ProgramEntity } from "../../domain/entities/program.entity";
import { ProgramInfraMapper } from "../mappers/program-infra.mapper";
import { BusinessGoalEntity } from "../../domain/entities/businessgoal.entity";
import { BusinessGoalInfraMapper } from "../mappers/businessgoal-infra.mapper";

@Injectable()
export class ProgramRepositoryImpl implements ProgramRepository {
  constructor(
    @InjectModel(ProgramModel.name)
    private readonly model: Model<ProgramDocument>,
    private readonly programMapper: ProgramInfraMapper,
    private readonly businessGoalMapper: BusinessGoalInfraMapper,
  ) {}

  public async findById(programId: string): Promise<ProgramEntity> {
    const document = await this.model
      .findOne({ programId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(`Program with ID ${programId} not found.`),
          ),
      );
    return this.programMapper.documentToEntity(document);
  }

  public async findAllOfClient(clientId: string): Promise<ProgramEntity[]> {
    const documents = await this.model
      .find({ clientId })
      .exec()
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `No Programs with Client ID ${clientId} found.`,
            ),
          ),
      );
    return documents.map((document) =>
      this.programMapper.documentToEntity(document),
    );
  }

  public async create(entity: ProgramEntity): Promise<ProgramEntity> {
    const programModel = this.programMapper.entityToModel(entity);
    const document = await this.model
      .create(programModel)
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `Failed to create document with entity: ${entity}`,
            ),
          ),
      );
    return this.programMapper.documentToEntity(document);
  }

  public async addBusinessGoal(
    programId: string,
    entity: BusinessGoalEntity,
  ): Promise<ProgramEntity> {
    const businessGoalModel = this.businessGoalMapper.entityToModel(entity);
    await this.model
      .updateOne(
        { programId },
        {
          $push: {
            businessGoals: businessGoalModel,
          },
        },
      )
      .then(
        (response) =>
          response ??
          Promise.reject(
            new BadRequestException(
              `Failed to create document with entity: ${entity}`,
            ),
          ),
      );

    const document = await this.model.findOne({ programId }).exec();
    return this.programMapper.documentToEntity(document);
  }
}
