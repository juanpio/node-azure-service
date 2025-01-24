import { Test, TestingModule } from "@nestjs/testing";
import { PlanController } from "../../../../src/services/plan/api/plan.controller";
import { PlanService } from "../../../../src/services/plan/api/plan.service";
import { PlanRepositoryImpl } from "../../../../src/services/plan/infra/repositories/plan.repository";
import { getModelToken } from "@nestjs/mongoose";
import { planModelMock } from "../mocks/plan-model.mock";

describe("PlanController", () => {
  let controller: PlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [
        PlanService,
        PlanRepositoryImpl,
        {
          provide: getModelToken("Plan"),
          useValue: planModelMock,
        },
      ],
    }).compile();

    controller = module.get<PlanController>(PlanController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
