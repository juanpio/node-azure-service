import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbConfigService } from "@src/common/services/db/db-config.service";
import { PlanController } from "./api/plan.controller";
import { PlanService } from "./api/plan.service";
import { PLAN_REPOSITORY } from "./domain/contracts/repositories/plan-repository.interface";
import { PlanRepositoryImpl } from "./infrastructure/repositories/plan.repository";
import { PlanGoalController } from "./api/plangoal.controller";
import { PlanGoalService } from "./api/plangoal.service";
import { TemplateModule } from "../templates/template.module";
import { DateStringToDatePipe } from "@src/common/pipes/datestring-to-date.pipe";
import { PlanInfraMapper } from "./infrastructure/mappers/plan-infra.mapper";
import { PlanGoalInfraMapper } from "./infrastructure/mappers/plangoal-infra.mapper";
import { PlanGoalApiMapper } from "./api/mappers/plangoal-api.mapper";
import { PlanApiMapper } from "./api/mappers/plan-api.mapper";
import { PlanModel, PlanSchema } from "./infrastructure/schemas/plan.schema";

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: DbConfigService }),
    MongooseModule.forFeature([{ name: PlanModel.name, schema: PlanSchema }]),
    TemplateModule,
  ],
  controllers: [PlanController, PlanGoalController],
  providers: [
    PlanService,
    {
      provide: PLAN_REPOSITORY,
      useClass: PlanRepositoryImpl,
    },
    PlanGoalService,
    DateStringToDatePipe,
    PlanInfraMapper,
    PlanGoalInfraMapper,
    PlanApiMapper,
    PlanGoalApiMapper,
  ],
  exports: [],
})
export class PlanModule {}
