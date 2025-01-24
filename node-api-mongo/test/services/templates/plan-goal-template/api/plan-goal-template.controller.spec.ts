import { Test, TestingModule } from "@nestjs/testing";
import { PlanGoalTemplateController } from "../../../../../src/services/plan-goal-template/api/plan-goal-template.controller";
import { PlanGoalTemplateService } from "../../../../../src/services/plan-goal-template/api/plan-goal-template.service";
import {
  ViewPlanGoalTemplateDto,
  CreatePlanGoalTemplateDto,
} from "../../../../../src/services/plan-goal-template/api/dtos/plan-goal-template.dto";
// import { IepLoggerService } from 'iep-libs-common';
import {
  PlanGoalTemplateCategory,
  ActivityType,
  BusinessGoalCategory,
} from "../../../../../src/services/plan-goal-template/domain/entities";
import { Response } from "express";
import { HttpStatus } from "@nestjs/common";

describe("PlanGoalTemplateController", () => {
  let controller: PlanGoalTemplateController;
  let service: PlanGoalTemplateService;
  // let logger: IepLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanGoalTemplateController],
      providers: [
        {
          provide: PlanGoalTemplateService,
          useValue: {
            getPlanGoalTemplate: jest.fn(),
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

    controller = module.get<PlanGoalTemplateController>(
      PlanGoalTemplateController,
    );
    service = module.get<PlanGoalTemplateService>(PlanGoalTemplateService);
    // logger = module.get<IepLoggerService>(IepLoggerService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("listPlanGoalTemplate", () => {
    it("should return plan goal template", async () => {
      const planGoalTemplateId = "123";
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const planGoalTemplate = {
        planGoalTemplateId: planGoalTemplateId,
        version: "1.0",
        author: "Test Author",
        lastEditedBy: "Test Editor",
        name: "Test Template",
        desc: "Test Description",
        category: PlanGoalTemplateCategory.Preventive,
        activityType: ActivityType.AnnualWellnessScreening,
        rule: "Test Rule",
        ruleTarget: 123,
        businessGoalCategory: BusinessGoalCategory.ConditionManagement,
        kpiIds: ["kpi1", "kpi2"],
        partnerIds: ["partner1", "partner2"],
      } as ViewPlanGoalTemplateDto;

      jest
        .spyOn(service, "getPlanGoalTemplate")
        .mockResolvedValue(planGoalTemplate);

      await controller.listPlanGoalTemplate(mockResponse, planGoalTemplateId);

      // expect(logger.debug).toHaveBeenCalledWith('Listing plan goal template');
      expect(service.getPlanGoalTemplate).toHaveBeenCalledWith(
        planGoalTemplateId,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(planGoalTemplate);
    });

    it("should handle errors", async () => {
      const planGoalTemplateId = "123";
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(service, "getPlanGoalTemplate")
        .mockRejectedValue(new Error("Error"));

      await expect(
        controller.listPlanGoalTemplate(mockResponse, planGoalTemplateId),
      ).rejects.toThrow("Error");
    });
  });

  describe("createPlanGoalTemplate", () => {
    it("should create a new plan goal template", async () => {
      const createDto: CreatePlanGoalTemplateDto = {
        planGoalTemplateId: "123",
        version: "1.0",
        author: "Test Author",
        lastEditedBy: "Test Editor",
        name: "Test Template",
        desc: "Test Description",
        category: PlanGoalTemplateCategory.Preventive,
        activityType: ActivityType.AnnualWellnessScreening,
        rule: "Test Rule",
        ruleTarget: 123,
        businessGoalCategory: BusinessGoalCategory.ConditionManagement,
        kpiIds: ["kpi1", "kpi2"],
        partnerIds: ["partner1", "partner2"],
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.createPlanGoalTemplate(response, createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
