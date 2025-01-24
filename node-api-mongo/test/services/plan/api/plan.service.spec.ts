import { Test, TestingModule } from "@nestjs/testing";
import { PlanService } from "../../../../src/services/plan/api/plan.service";
import { PlanRepositoryImpl } from "../../../../src/services/plan/infra/repositories/plan.repository";
import { planModelMock } from "../mocks/plan-model.mock";
import { getModelToken } from "@nestjs/mongoose";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { planRepositoryMock } from "../mocks/plan.repository.mock";

describe("PlanService", () => {
  let service: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        { provide: PlanRepositoryImpl, useValue: planRepositoryMock },
        {
          provide: getModelToken("Plan"),
          useValue: planModelMock,
        },
      ],
    }).compile();

    service = module.get<PlanService>(PlanService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

describe("PlanService.createPlan", () => {
  let service: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        { provide: PlanRepositoryImpl, useValue: planRepositoryMock },
        {
          provide: getModelToken("Plan"),
          useValue: planModelMock,
        },
      ],
    }).compile();

    service = module.get<PlanService>(PlanService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a plan domain entity when the plan is created successfully", async () => {
    planRepositoryMock.getAll.mockResolvedValue([]);

    planRepositoryMock.create.mockResolvedValue({
      id: "<id>",
      name: "Test Plan",
    });

    const createdPlan = await service.createPlan("<program-id>", {
      name: "Test Plan",
      description: "Test Description",
      start: new Date("2021-01-01"),
      end: new Date("2021-01-02"),
      budget: 0,
      maxMemberPayout: 0,
      goals: [
        {
          templateId: "string",
          incentive: {
            amount: 0,
            incentiveEmun: "cash",
          },
        },
      ],
    });

    expect(createdPlan).toBeDefined();
  });

  it("should throws a ConflicError when the plan with same name exists", async () => {
    planRepositoryMock.getAll.mockResolvedValue([
      {
        id: "<id>",
        name: "Test Plan",
      },
    ]);

    await expect(
      service.createPlan("<program-id>", {
        name: "Test Plan",
        description: "Test Description",
        start: new Date("2021-01-01"),
        end: new Date("2021-01-02"),
        budget: 0,
        maxMemberPayout: 0,
        goals: [
          {
            templateId: "string",
            incentive: {
              amount: 0,
              incentiveEmun: "cash",
            },
          },
        ],
      }),
    ).rejects.toThrow(ConflictException);
  });
});

describe("PlanService.getPlanById", () => {
  let service: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        PlanRepositoryImpl,
        {
          provide: getModelToken("Plan"),
          useValue: planModelMock,
        },
      ],
    }).compile();

    service = module.get<PlanService>(PlanService);
  });

  it("should throw BadRequestException if id is not provided", async () => {
    await expect(service.getPlanById("")).rejects.toThrow(BadRequestException);
    await expect(service.getPlanById("")).rejects.toThrow("id is required");
  });

  it("should throw NotFoundException if plan is not found", async () => {
    planModelMock.exec.mockResolvedValue(null);

    await expect(service.getPlanById("<non-existent-id>")).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getPlanById("<non-existent-id>")).rejects.toThrow(
      "Plan not found",
    );
  });

  it("should return a plan entity if plan exists", async () => {
    planModelMock.exec.mockResolvedValue([{ id: "<id>", name: "Test Plan" }]);

    const result = await service.getPlanById("<id>");

    expect(result).toBeDefined();
  });
});
