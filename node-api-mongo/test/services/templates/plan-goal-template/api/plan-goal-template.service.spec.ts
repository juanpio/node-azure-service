import { TestingModule, Test } from "@nestjs/testing";
import { BusinessGoalCategory } from "@src/services/template/plan-goal/domain/enums/business-goal-category.enum";
import { PlanGoalTemplateMapper } from "@src/services/template/plan-goal/api/mappers/plan-goal-template.mapper";
import { PlanGoalTemplateService } from "@src/services/template/plan-goal/api/plan-goal-template.service";
import { PlanGoalTemplate } from "@src/services/template/plan-goal/domain/entities";
import {
  PlanGoalTemplateCategory,
  ActivityType,
} from "@src/services/template/plan-goal/domain/enums";
import { PlanGoalTemplateRepository } from "@src/services/template/plan-goal/infrastructure/repositories/plan-goal-template.repository";

describe("PlanGoalTemplateService", () => {
  let service: PlanGoalTemplateService;
  let repository: PlanGoalTemplateRepository;
  // let logger: IepLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanGoalTemplateService,
        {
          provide: "PlanGoalTemplateRepository",
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

    service = module.get<PlanGoalTemplateService>(PlanGoalTemplateService);
    repository = module.get<PlanGoalTemplateRepository>(
      "PlanGoalTemplateRepository",
    );
    // logger = module.get<IepLoggerService>(IepLoggerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getPlanGoalTemplate", () => {
    it.skip("should return plan goal template", async () => {
      const planGoalTemplateId = "123";
      const planGoalTemplate = new PlanGoalTemplate(
        "123",
        "1.0",
        "Test Author",
        "Test Editor",
        "Test Template",
        "Test Description",
        PlanGoalTemplateCategory.Preventive,
        ActivityType.AnnualWellnessScreening,
        "Test Rule",
        123,
        "Cost Saving" as BusinessGoalCategory,
        ["kpi1", "kpi2"],
        ["partner1", "partner2"],
        ['{"member_id": "ABC123","age":"45"}'],
      );

      jest.spyOn(repository, "find").mockResolvedValue(planGoalTemplate);

      const result = await service.getPlanGoalTemplate(planGoalTemplateId);

      expect(result).toEqual(
        PlanGoalTemplateMapper.fromEntityToViewPlanGoalTemplateDto(
          planGoalTemplate,
        ),
      );
    });

    it.skip("should throw InputValidationException when plan goal template is not found", async () => {
      // const planGoalTemplateId = "123";
      jest.spyOn(repository, "find").mockResolvedValue(null);

      // try {
      //   await service.getPlanGoalTemplate(planGoalTemplateId);
      // } catch (e) {
      //   expect(e).toBeInstanceOf(InputValidationException);
      //   expect(e).toEqual(new InputValidationException({
      //       title: 'Plan Goal Template not found',
      //       detail: `Plan Goal Template with ID ${planGoalTemplateId} not found`,
      //   } as Rfc9457Data));
      // }
    });
  });

  describe("createPlanGoalTemplate", () => {
    it("should create plan goal template", async () => {
      const planGoalTemplate = new PlanGoalTemplate(
        "123",
        "1.0",
        "Test Author",
        "Test Editor",
        "Test Template",
        "Test Description",
        PlanGoalTemplateCategory.Preventive,
        ActivityType.AnnualWellnessScreening,
        "Test Rule",
        123,
        BusinessGoalCategory.PreventativeCare,
        ["kpi1", "kpi2"],
        ["partner1", "partner2"],
        ['{"member_id": "ABC123","age":"45"}'],
      );

      jest.spyOn(repository, "create").mockResolvedValue(undefined);

      const result = await service.create(planGoalTemplate);

      expect(result).toBeUndefined();
    });

    it.skip("should throw InputValidationException when plan goal template creation fails", async () => {
      const planGoalTemplate = new PlanGoalTemplate(
        "123",
        "1.0",
        "Test Author",
        "Test Editor",
        "Test Template",
        "Test Description",
        PlanGoalTemplateCategory.Preventive,
        ActivityType.AnnualWellnessScreening,
        "Test Rule",
        123,
        BusinessGoalCategory.PreventativeCare,
        ["kpi1", "kpi2"],
        ["partner1", "partner2"],
        ['{"member_id": "ABC123","age":"45"}'],
      );
      jest
        .spyOn(repository, "create")
        .mockRejectedValue(new Error("Test Error"));
      //try {
      await service.create(planGoalTemplate);
      //} catch (e) {
      // expect(e).toBeInstanceOf(InputValidationException);
      // expect(e).toEqual(new InputValidationException({
      //     title: 'Error creating plan goal template',
      //     traceId: '*** to be implemented ***',
      // } as Rfc9457Data));
      //}
    });
  });
});
