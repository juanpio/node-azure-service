import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Body,
  HttpStatus,
  Param,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { Response } from "express";
import { PlanGoalEntity } from "../domain/entities/plangoal.entity";
import { CreatePlanGoalDto } from "./dtos/create-plangoal.dto";
import { ViewPlanGoalDto } from "./dtos/view-plangoal.dto";
import { PlanGoalApiMapper } from "./mappers/plangoal-api.mapper";
import { PlanGoalService } from "./plangoal.service";

@Controller({ path: "plans/:planId/goals" })
export class PlanGoalController {
  constructor(
    private readonly service: PlanGoalService,
    private readonly mapper: PlanGoalApiMapper,
  ) {}

  @Get(":planGoalId")
  public async getPlanGoal(
    @Res() res: Response,
    @Param("planId") planId: string,
    @Param("planGoalId") planGoalId: string,
  ): Promise<Response> {
    const entity: PlanGoalEntity = await this.service.getById(
      planId,
      planGoalId,
    );
    const dto: ViewPlanGoalDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.OK).send(dto);
  }

  @Get()
  public async getAllPlanGoals(
    @Res() res: Response,
    @Param("planId") planId: string,
  ): Promise<Response> {
    const entities: PlanGoalEntity[] =
      await this.service.getAllGoalsOfPlan(planId);
    const dto: ViewPlanGoalDto[] = entities.map((entity) =>
      this.mapper.entityToViewDto(entity),
    );
    return res.status(HttpStatus.OK).send(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async createPlanGoal(
    @Res() res: Response,
    @Param("planId") planId: string,
    @Query("planGoalTemplateId") templateId: string,
    @Body() body: CreatePlanGoalDto,
  ): Promise<Response> {
    if (!body)
      throw new BadRequestException("You must provide a request body.");
    if (!templateId)
      throw new BadRequestException(
        'You must provide "businessGoalTemplateId".',
      );

    const entity: PlanGoalEntity = await this.service.create(
      planId,
      templateId,
      body,
    );
    const dto: ViewPlanGoalDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.CREATED).send(dto);
  }
}
