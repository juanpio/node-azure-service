import { Test, TestingModule } from "@nestjs/testing";

import { BusinessGoalTemplateService } from "../../../../../src/services/template/business-goal/api/business-goal-template.service";
import { CreateBusinessGoalTemplateDto } from "../../../../../src/services/template/business-goal/api/dtos/create-business-goal-template.dto";
import { BusinessGoalTemplate } from "../../../../../src/services/template/business-goal/domain/entities/business-goal-template.entity";
import { BUSINESS_GOAL_TEMPLATE_REPOSITORY, IBusinessGoalTemplateRepository } from "../../../../../src/services/template/business-goal/domain/interfaces/ibusiness-goal-template.respository";

describe("BusinessGoalTemplateService", () => {
  let service: BusinessGoalTemplateService;
  let repository: IBusinessGoalTemplateRepository;
  let goalTemplateMock: BusinessGoalTemplate;
  let dto: CreateBusinessGoalTemplateDto;

  beforeEach(async () => {
    const mockRepository: Partial<IBusinessGoalTemplateRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOneById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessGoalTemplateService,
        {
          provide: BUSINESS_GOAL_TEMPLATE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BusinessGoalTemplateService>(
      BusinessGoalTemplateService,
    );
    repository = module.get<IBusinessGoalTemplateRepository>(
      BUSINESS_GOAL_TEMPLATE_REPOSITORY,
    );

    dto = {
      businessGoalTemplateId: "BGT-123",
      version: "1.0",
      author: "Some Author",
      lastEditedBy: "Some Author",
      name: "Goal template Test",
      desc: "Description x",
      type: "Completion" as any,
      category: "PreventiveCare" as any,
      kpiId: "KPI-1",
      availablePlanGoalTemplateIds: ["PG-1"],
      availablePartnerIds: ["Partner1"],
    };

    goalTemplateMock = new BusinessGoalTemplate(
      dto.businessGoalTemplateId,
      dto.version,
      dto.author,
      dto.lastEditedBy,
      dto.name,
      dto.desc,
      dto.type,
      dto.category,
      dto.kpiId,
      dto.availablePlanGoalTemplateIds,
      dto.availablePartnerIds,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a Business Goal Template", async () => {
      (repository.create as jest.Mock).mockResolvedValue(goalTemplateMock);

      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith(
        expect.any(BusinessGoalTemplate),
      );
      expect(result).toEqual(goalTemplateMock);
    });
  });

  describe("findAll", () => {
    it("should return all Business Goal Templates", async () => {
      const mockData: BusinessGoalTemplate[] = [goalTemplateMock];
      (repository.findAll as jest.Mock).mockResolvedValue(mockData);

      const result = await service.findAll();
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe("findOneById", () => {
    it("should return a Business Goal Templates with a specified ID", async () => {
      (repository.findOneById as jest.Mock).mockResolvedValue(goalTemplateMock);

      const result = await service.findOneById("BGT-1");
      expect(repository.findOneById).toHaveBeenCalledWith("BGT-1");
      expect(result).toEqual(goalTemplateMock);
    });
  });
});
