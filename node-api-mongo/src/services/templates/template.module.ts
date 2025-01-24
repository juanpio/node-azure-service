import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbConfigService } from "@src/common/services/db/db-config.service";
import { BusinessGoalTemplateService } from "./api/businessgoaltemplate.service";
import { BUSINESS_GOAL_TEMPLATE_REPOSITORY } from "./domain/contracts/repositories/businessgoaltemplate-repository.interface";
import { BusinessGoalTemplateRepositoryImpl } from "./infrastructure/repositories/businessgoaltemplate.repository";
import { BusinessGoalTemplateController } from "./api/businessgoaltemplate.controller";
import {
  BusinessGoalTemplateModel,
  BusinessGoalTemplateSchema,
} from "./infrastructure/schemas/businessgoaltemplate.schema";
import { BusinessGoalTemplateInfraMapper } from "./infrastructure/mappers/businessgoaltemplate-infra.mapper";
import { BusinessGoalTemplateApiMapper } from "./api/mappers/businessgoaltemplate-api.mapper";
import { PlanGoalTemplateService } from "./api/plangoaltemplate.service";
import { PlanGoalTemplateInfraMapper } from "./infrastructure/mappers/plangoaltemplate-infra.mapper";
import {
  PlanGoalTemplateModel,
  PlanGoalTemplateSchema,
} from "./infrastructure/schemas/plangoaltemplate.schema";
import { PlanGoalTemplateController } from "./api/plangoaltemplate.controller";
import { PlanGoalTemplateApiMapper } from "./api/mappers/plangoaltemplate-api.mapper";
import { PLAN_GOAL_TEMPLATE_REPOSITORY } from "./domain/contracts/repositories/plangoaltemplate-repository.interface";
import { PlanGoalTemplateRepositoryImpl } from "./infrastructure/repositories/plangoaltemplate.repository";

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: DbConfigService }),
    MongooseModule.forFeature([
      {
        name: BusinessGoalTemplateModel.name,
        schema: BusinessGoalTemplateSchema,
      },
      {
        name: PlanGoalTemplateModel.name,
        schema: PlanGoalTemplateSchema,
      },
    ]),
  ],
  controllers: [BusinessGoalTemplateController, PlanGoalTemplateController],
  providers: [
    BusinessGoalTemplateService,
    PlanGoalTemplateService,
    {
      provide: BUSINESS_GOAL_TEMPLATE_REPOSITORY,
      useClass: BusinessGoalTemplateRepositoryImpl,
    },
    {
      provide: PLAN_GOAL_TEMPLATE_REPOSITORY,
      useClass: PlanGoalTemplateRepositoryImpl,
    },
    BusinessGoalTemplateInfraMapper,
    BusinessGoalTemplateApiMapper,
    PlanGoalTemplateInfraMapper,
    PlanGoalTemplateApiMapper,
  ],
  exports: [BusinessGoalTemplateService, PlanGoalTemplateService],
})
export class TemplateModule {}
