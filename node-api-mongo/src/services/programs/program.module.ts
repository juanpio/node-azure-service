import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbConfigService } from "@src/common/services/db/db-config.service";
import { ProgramController } from "./api/program.controller";
import { ProgramService } from "./api/program.service";
import { PROGRAM_REPOSITORY } from "./domain/contracts/repositories/program-repository.interface";
import { ProgramRepositoryImpl } from "./infrastructure/repositories/program.repository";
import {
  ProgramSchema,
  ProgramModel,
} from "./infrastructure/schemas/program.schema";
import { BusinessGoalController } from "./api/businessgoal.controller";
import { BusinessGoalService } from "./api/businessgoal.service";
import { TemplateModule } from "../templates/template.module";
import { DateStringToDatePipe } from "@src/common/pipes/datestring-to-date.pipe";
import { ProgramInfraMapper } from "./infrastructure/mappers/program-infra.mapper";
import { BusinessGoalInfraMapper } from "./infrastructure/mappers/businessgoal-infra.mapper";
import { BusinessGoalApiMapper } from "./api/mappers/businessgoal-api.mapper";
import { ProgramApiMapper } from "./api/mappers/program-api.mapper";

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: DbConfigService }),
    MongooseModule.forFeature([
      { name: ProgramModel.name, schema: ProgramSchema },
    ]),
    TemplateModule,
  ],
  controllers: [ProgramController, BusinessGoalController],
  providers: [
    ProgramService,
    {
      provide: PROGRAM_REPOSITORY,
      useClass: ProgramRepositoryImpl,
    },
    BusinessGoalService,
    DateStringToDatePipe,
    ProgramInfraMapper,
    BusinessGoalInfraMapper,
    ProgramApiMapper,
    BusinessGoalApiMapper,
  ],
  exports: [],
})
export class ProgramModule {}
