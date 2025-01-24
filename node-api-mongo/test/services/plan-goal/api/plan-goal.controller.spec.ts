import { Test, TestingModule } from "@nestjs/testing";
import { PlanGoalController } from "../../../../src/services/plan-goal/api/plan-goal.controller";
import { PlanGoalService } from "../../../../src/services/plan-goal/api/plan-goal.service";
import {
  ViewPlanGoalDto,
  CreatePlanGoalDto,
} from "../../../../src/services/plan-goal/api/dtos/plan-goal.dto";
// import { IepLoggerService } from 'iep-libs-common';
import {
  PlanGoalStatus,
  IncentiveType,
} from "../../../../src/services/plan-goal//domain/entities";
import { Response } from "express";
import { HttpStatus } from "@nestjs/common";

describe("PlanGoalController", () => {
  let controller: PlanGoalController;
  let service: PlanGoalService;
  // let logger: IepLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanGoalController],
      providers: [
        {
          provide: PlanGoalService,
          useValue: {
            getPlanGoal: jest.fn(),
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

    controller = module.get<PlanGoalController>(PlanGoalController);
    service = module.get<PlanGoalService>(PlanGoalService);
    // logger = module.get<IepLoggerService>(IepLoggerService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("listPlanGoal", () => {
    it("should return plan goal", async () => {
      const planGoalId = "123";
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const PlanGoal = {
        planGoalId: planGoalId,
        planGoalTemplateId: "456",
        status: PlanGoalStatus.Active,
        incentive: { amount: 100, type: IncentiveType.Cash },
      } as ViewPlanGoalDto;

      jest.spyOn(service, "getPlanGoal").mockResolvedValue(PlanGoal);

      await controller.listPlanGoal(mockResponse, planGoalId);

      // expect(logger.debug).toHaveBeenCalledWith('Listing plan goal');
      expect(service.getPlanGoal).toHaveBeenCalledWith(planGoalId);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(PlanGoal);
    });

    it("should handle errors", async () => {
      const planGoalId = "123";
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(service, "getPlanGoal").mockRejectedValue(new Error("Error"));

      await expect(
        controller.listPlanGoal(mockResponse, planGoalId),
      ).rejects.toThrow("Error");
    });
  });

  describe("createPlanGoal", () => {
    it("should create a new plan goal", async () => {
      let planGoalTemplateId = "1234";
      const createDto: CreatePlanGoalDto = {
        planGoalTemplateId: planGoalTemplateId,
        status: PlanGoalStatus.Active,
        incentive: { amount: 100, type: IncentiveType.Cash },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.createPlanGoal(response, createDto, planGoalTemplateId);

      expect(service.create).toHaveBeenCalledWith(
        planGoalTemplateId,
        createDto,
      );
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
