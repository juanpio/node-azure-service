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
import { PlanEntity } from "../domain/entities/plan.entity";
import { ViewPlanDto } from "./dtos/view-plan.dto";
import { PlanApiMapper } from "./mappers/plan-api.mapper";
import { PlanService } from "./plan.service";
import { CreatePlanDto } from "./dtos/create-plan.dto";

@Controller({ path: "plans" })
export class PlanController {
  constructor(
    private readonly service: PlanService,
    private readonly mapper: PlanApiMapper,
  ) {}

  @Get(":planId")
  public async getPlan(
    @Res() res: Response,
    @Param("planId") planId: string,
  ): Promise<Response> {
    const entity: PlanEntity = await this.service.getById(planId);
    const dto: ViewPlanDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.OK).send(dto);
  }

  @Get()
  public async getAllPlans(
    @Res() res: Response,
    @Query("programId") programId: string,
  ): Promise<Response> {
    if (!programId)
      throw new BadRequestException('You must provide "programId".');

    const entities: PlanEntity[] =
      await this.service.getAllPlansOfProgram(programId);
    const dto: ViewPlanDto[] = entities.map((entity) =>
      this.mapper.entityToViewDto(entity),
    );
    return res.status(HttpStatus.OK).send(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async createPlan(
    @Res() res: Response,
    @Query("programId") programId: string,
    @Body() body: CreatePlanDto,
  ): Promise<Response> {
    if (!programId)
      throw new BadRequestException('You must provide "programId".');
    if (!body)
      throw new BadRequestException("You must provide a request body.");

    const entity: PlanEntity = await this.service.create(programId, body);
    const dto: ViewPlanDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.CREATED).send(dto);
  }
}
