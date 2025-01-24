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
import { ProgramService } from "./program.service";
import { ProgramEntity } from "../domain/entities/program.entity";
import { ViewProgramDto } from "./dtos/view-program.dto";
import { ProgramApiMapper } from "./mappers/program-api.mapper";
import { CreateProgramDto } from "./dtos/create-program.dto";

@Controller({ path: "programs" })
export class ProgramController {
  constructor(
    private readonly service: ProgramService,
    private readonly mapper: ProgramApiMapper,
  ) {}

  @Get(":programId")
  public async getProgram(
    @Res() res: Response,
    @Param("programId") programId: string,
  ): Promise<Response> {
    const entity: ProgramEntity = await this.service.getById(programId);
    const dto: ViewProgramDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.OK).send(dto);
  }

  @Get("client/:clientId")
  public async getAllPrograms(
    @Res() res: Response,
    @Param("clientId") clientId: string,
    // @Query("activeOnly") activeOnly?: boolean, // TODO: Get only active programs
  ): Promise<Response> {
    const entities: ProgramEntity[] =
      await this.service.getAllProgramsOfClient(clientId);
    const dto: ViewProgramDto[] = entities.map((entity) =>
      this.mapper.entityToViewDto(entity),
    );
    return res.status(HttpStatus.OK).send(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async createProgram(
    @Res() res: Response,
    @Body() body: CreateProgramDto,
  ): Promise<Response> {
    if (!body)
      throw new BadRequestException("You must provide a request body.");

    const entity: ProgramEntity = await this.service.create(body);
    const dto: ViewProgramDto = this.mapper.entityToViewDto(entity);
    return res.status(HttpStatus.CREATED).send(dto);
  }
}
