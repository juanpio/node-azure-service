import { Injectable, Inject } from "@nestjs/common";
import {
  BUSINESS_GOAL_TEMPLATE_REPOSITORY,
  BusinessGoalTemplateRepository,
} from "../domain/contracts/repositories/businessgoaltemplate-repository.interface";
import { BusinessGoalTemplateEntity } from "../domain/entities/businessgoaltemplate.entity";
import { CreateBusinessGoalTemplateDto } from "./dtos/create-businessgoaltemplate.dto";

@Injectable()
export class BusinessGoalTemplateService {
  constructor(
    @Inject(BUSINESS_GOAL_TEMPLATE_REPOSITORY)
    private readonly repository: BusinessGoalTemplateRepository,
  ) {}

  public async getById(
    businessGoalTemplateId: string,
  ): Promise<BusinessGoalTemplateEntity> {
    return await this.repository.findById(businessGoalTemplateId);
  }

  public async getAllBusinessGoalTemplates(): Promise<
    BusinessGoalTemplateEntity[]
  > {
    return await this.repository.findAll();
  }

  public async create(
    createDto: CreateBusinessGoalTemplateDto,
  ): Promise<BusinessGoalTemplateEntity> {
    const version = "1.0";
    const author = "Luke";
    const lastEditedBy = "Juan";

    const entity = new BusinessGoalTemplateEntity(
      createDto.businessGoalTemplateId,
      version,
      author,
      lastEditedBy,
      createDto.name,
      createDto.desc,
      createDto.type,
      createDto.category,
      createDto.kpiId,
      createDto.availablePlanGoalTemplateIds,
      createDto.availablePartnerIds,
      createDto.aiDescription,
    );
    return await this.repository.create(entity);
  }
}
