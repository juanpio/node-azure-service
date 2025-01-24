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
import { BusinessGoalService } from "./businessgoal.service";
import { BusinessGoalApiMapper } from "./mappers/businessgoal-api.mapper";
import { BusinessGoalEntity } from "../domain/entities/businessgoal.entity";
import { ViewBusinessGoalDto } from "./dtos/view-businessgoal.dto";
import { CreateBusinessGoalDto } from "./dtos/create-businessgoal.dto";

@Controller({ path: "programs/:programId/businessGoals" })
export class BusinessGoalController {
  constructor(
    private readonly service: BusinessGoalService,
    private readonly mapper: BusinessGoalApiMapper,
  ) {}

  @Get(":businessGoalId")
  public async getBusinessGoal(
    @Res() res: Response,
    @Param("programId") programId: string,
    @Param("businessGoalId") businessGoalId: string,
  ): Promise<Response> {
    const entity: BusinessGoalEntity = await this.service.getById(
      programId,
      businessGoalId,
    );
    const dto: ViewBusinessGoalDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.OK).send(dto);
  }

  @Get()
  public async getAllBusinessGoals(
    @Res() res: Response,
    @Param("programId") programId: string,
  ): Promise<Response> {
    const entities: BusinessGoalEntity[] =
      await this.service.getAllBusinessGoalsOfProgram(programId);
    const dto: ViewBusinessGoalDto[] = entities.map((entity) =>
      this.mapper.entityToViewDto(entity),
    );
    return res.status(HttpStatus.OK).send(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async createBusinessGoal(
    @Res() res: Response,
    @Param("programId") programId: string,
    @Query("businessGoalTemplateId") templateId: string,
    @Body() body: CreateBusinessGoalDto,
  ): Promise<Response> {
    if (!body)
      throw new BadRequestException("You must provide a request body.");
    if (!templateId)
      throw new BadRequestException(
        'You must provide "businessGoalTemplateId".',
      );

    const entity: BusinessGoalEntity = await this.service.create(
      programId,
      templateId,
      body,
    );
    const dto: ViewBusinessGoalDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.CREATED).send(dto);
  }
}
