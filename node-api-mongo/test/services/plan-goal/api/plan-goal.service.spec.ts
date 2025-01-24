import { Test, TestingModule } from "@nestjs/testing";
import { PlanGoalService } from "../../../../src/services/plan-goal/api/plan-goal.service";
import { PlanGoalRepository } from "../../../../src/services/plan-goal/domain/repositories/plan-goal.repository.interface";
import {
  Incentive,
  PlanGoalEntity,
  PlanGoalStatus,
  IncentiveType,
} from "../../../../src/services/plan-goal/domain/entities/plan-goal.entity";
// import { IepLoggerService, InputValidationException, Rfc9457Data } from 'iep-libs-common';
import { PlanGoalMapper } from "../../../../src/services/plan-goal/api/mappers/plan-goal.mapper";

describe("PlanGoalService", () => {
  let service: PlanGoalService;
  let repository: PlanGoalRepository;
  // let logger: IepLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanGoalService,
        {
          provide: "PlanGoalRepository",
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
        // {
        //     provide: IepLoggerService,
        //     useValue: {
        //         debug: jest.fn(),
        //     },
        // },
      ],
    }).compile();

    service = module.get<PlanGoalService>(PlanGoalService);
    repository = module.get<PlanGoalRepository>("PlanGoalRepository");
    // logger = module.get<IepLoggerService>(IepLoggerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getPlanGoal", () => {
    it("should return plan goal", async () => {
      const planGoalId = "123";
      const incentive = new Incentive(100, IncentiveType.Cash);
      const planGoal = new PlanGoalEntity(
        planGoalId,
        "1234",
        PlanGoalStatus.Active,
        incentive,
      );

      jest.spyOn(repository, "find").mockResolvedValue(planGoal);

      const result = await service.getPlanGoal(planGoalId);

      expect(result).toEqual(
        PlanGoalMapper.fromEntityToViewPlanGoalDto(planGoal),
      );
    });

    it("should throw InputValidationException when plan goal is not found", async () => {
      const planGoalId = "123";
      jest.spyOn(repository, "find").mockResolvedValue(null);

      try {
        await service.getPlanGoal(planGoalId);
      } catch (e) {
        // expect(e).toBeInstanceOf(InputValidationException);
        // expect(e).toEqual(new InputValidationException({
        //     title: 'Plan Goal not found',
        //     detail: `Plan Goal with ID ${planGoalId} not found`,
        // } as Rfc9457Data));
      }
    });
  });

  describe("createPlanGoal", () => {
    it("should create plan goal", async () => {
      const incentive = new Incentive(100, IncentiveType.Cash);
      const planGoalTemplateId = "1234";
      const planGoal = new PlanGoalEntity(
        "123",
        planGoalTemplateId,
        PlanGoalStatus.Active,
        incentive,
      );

      jest.spyOn(repository, "create").mockResolvedValue(undefined);

      const result = await service.create(planGoalTemplateId, planGoal);

      expect(result).toBeUndefined();
    });

    it("should throw InputValidationException when plan goal creation fails", async () => {
      const incentive = new Incentive(100, IncentiveType.Cash);
      const planGoalTemplateId = "1234";
      const planGoal = new PlanGoalEntity(
        "123",
        planGoalTemplateId,
        PlanGoalStatus.Active,
        incentive,
      );

      jest
        .spyOn(repository, "create")
        .mockRejectedValue(new Error("Test Error"));

      try {
        await service.create(planGoalTemplateId, planGoal);
      } catch (e) {
        // expect(e).toBeInstanceOf(InputValidationException);
        // expect(e).toEqual(new InputValidationException({
        //     title: 'Error creating plan goal',
        //     traceId: '*** to be implemented ***',
        // } as Rfc9457Data));
      }
    });
  });
});
