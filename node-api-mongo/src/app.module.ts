import { Module } from "@nestjs/common";
import { ProgramModule } from "./services/programs/program.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TemplateModule } from "./services/templates/template.module";
import { PlanModule } from "./services/plans/plan.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: false,
      ignoreEnvFile: false,
      cache: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DB_ATLAS_URI),
    ProgramModule,
    PlanModule,
    TemplateModule,
  ],
})
export class AppModule {}
