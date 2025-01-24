import { Test, TestingModule } from "@nestjs/testing";
import { PlanRepositoryImpl } from "../../../../src/services/plan/infra/repositories/plan.repository";
import { getModelToken } from "@nestjs/mongoose";
import { planModelMock } from "../mocks/plan-model.mock";

describe("PlanRepository", () => {
  let repository: PlanRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanRepositoryImpl,
        {
          provide: getModelToken("Plan"),
          useValue: planModelMock,
        },
      ],
    }).compile();

    repository = module.get<PlanRepositoryImpl>(PlanRepositoryImpl);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});

describe("PlanRepository.getPlanById", () => {
  let repository: PlanRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanRepositoryImpl,
        {
          provide: getModelToken("Plan"),
          useValue: planModelMock,
        },
      ],
    }).compile();

    repository = module.get<PlanRepositoryImpl>(PlanRepositoryImpl);
  });

  it("should return a plan when a plan exists", async () => {
    planModelMock.exec.mockResolvedValue({ planId: "<id>" });
    expect(await repository.getById("<id>")).toBeDefined();
  });

  it("should return null when a plan does not exist", async () => {
    planModelMock.exec.mockResolvedValue(null);
    expect(await repository.getById("<no-existed-id>")).toBeNull();
  });
});
