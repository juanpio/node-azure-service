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
import { BusinessGoalTemplateService } from "./businessgoaltemplate.service";
import { BusinessGoalTemplateApiMapper } from "./mappers/businessgoaltemplate-api.mapper";
import { BusinessGoalTemplateEntity } from "../domain/entities/businessgoaltemplate.entity";
import { ViewBusinessGoalTemplateDto } from "./dtos/view-businessgoaltemplate.dto";
import { CreateBusinessGoalTemplateDto } from "./dtos/create-businessgoaltemplate.dto";

@Controller({ path: "templates/businessgoals" })
export class BusinessGoalTemplateController {
  constructor(
    private readonly service: BusinessGoalTemplateService,
    private readonly mapper: BusinessGoalTemplateApiMapper,
  ) {}

  @Get(":businessGoalTemplateId")
  public async getBusinessGoalTemplate(
    @Res() res: Response,
    @Param("businessGoalTemplateId") businessGoalTemplateId: string,
  ): Promise<Response> {
    const entity: BusinessGoalTemplateEntity = await this.service.getById(
      businessGoalTemplateId,
    );
    const dto: ViewBusinessGoalTemplateDto =
      this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.OK).send(dto);
  }

  @Get()
  public async getAllBusinessGoalTemplates(
    @Res() res: Response,
  ): Promise<Response> {
    const entities: BusinessGoalTemplateEntity[] =
      await this.service.getAllBusinessGoalTemplates();
    const dto: ViewBusinessGoalTemplateDto[] = entities.map((entity) =>
      this.mapper.entityToViewDto(entity),
    );
    return res.status(HttpStatus.OK).send(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async createBusinessGoalTemplate(
    @Res() res: Response,
    @Body() body: CreateBusinessGoalTemplateDto,
  ): Promise<Response> {
    if (!body)
      throw new BadRequestException("You must provide a request body.");

    const entity: BusinessGoalTemplateEntity = await this.service.create(body);
    const dto: ViewBusinessGoalTemplateDto =
      this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.CREATED).send(dto);
  }
}
