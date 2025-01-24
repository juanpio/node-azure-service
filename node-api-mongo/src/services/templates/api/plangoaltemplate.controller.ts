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
  BadRequestException,
} from "@nestjs/common";
import { Response } from "express";
import { PlanGoalTemplateEntity } from "../domain/entities/plangoaltemplate.entity";
import { CreatePlanGoalTemplateDto } from "./dtos/create-plangoaltemplate.dto";
import { ViewPlanGoalTemplateDto } from "./dtos/view-plangoaltemplate.dto";
import { PlanGoalTemplateApiMapper } from "./mappers/plangoaltemplate-api.mapper";
import { PlanGoalTemplateService } from "./plangoaltemplate.service";

@Controller({ path: "templates/plangoals" })
export class PlanGoalTemplateController {
  constructor(
    private readonly service: PlanGoalTemplateService,
    private readonly mapper: PlanGoalTemplateApiMapper,
  ) {}

  @Get(":planGoalTemplateId")
  public async getPlanGoalTemplate(
    @Res() res: Response,
    @Param("planGoalTemplateId") planGoalTemplateId: string,
  ): Promise<Response> {
    const entity: PlanGoalTemplateEntity =
      await this.service.getById(planGoalTemplateId);
    const dto: ViewPlanGoalTemplateDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.OK).send(dto);
  }

  @Get()
  public async getAllPlanGoalTemplates(
    @Res() res: Response,
  ): Promise<Response> {
    const entities: PlanGoalTemplateEntity[] =
      await this.service.getAllPlanGoalTemplates();
    const dto: ViewPlanGoalTemplateDto[] = entities.map((entity) =>
      this.mapper.entityToViewDto(entity),
    );
    return res.status(HttpStatus.OK).send(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async createPlanGoalTemplate(
    @Res() res: Response,
    @Body() body: CreatePlanGoalTemplateDto,
  ): Promise<Response> {
    if (!body)
      throw new BadRequestException("You must provide a request body.");

    const entity: PlanGoalTemplateEntity = await this.service.create(body);
    const dto: ViewPlanGoalTemplateDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.CREATED).send(dto);
  }
}
