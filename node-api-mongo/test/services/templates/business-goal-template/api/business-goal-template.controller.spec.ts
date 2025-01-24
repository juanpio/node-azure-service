import { Test, TestingModule } from "@nestjs/testing";
import { Response } from 'express';

import { BusinessGoalTemplateService } from "../../../../../src/services/template/business-goal/api/business-goal-template.service";
import { BusinessGoalTemplateController } from "../../../../../src/services/template/business-goal/api/business-goal-template.controller";
import { CreateBusinessGoalTemplateDto } from "../../../../../src/services/template/business-goal/api/dtos/create-business-goal-template.dto";
import { BusinessGoalTemplate } from "../../../../../src/services/template/business-goal/domain/entities/business-goal-template.entity";
import { HttpStatus } from "@nestjs/common";

describe('BusinessGoalTemplateController', () => {
    let controller: BusinessGoalTemplateController;
    let service: BusinessGoalTemplateService;
    let goalTemplateMock: BusinessGoalTemplate;
    let dto: CreateBusinessGoalTemplateDto;
    let mockResponse: Partial<Response>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOneById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessGoalTemplateController],
      providers: [
        {
          provide: BusinessGoalTemplateService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BusinessGoalTemplateController>(
      BusinessGoalTemplateController,
    );
    service = module.get<BusinessGoalTemplateService>(
      BusinessGoalTemplateService,
    );

        dto = {
            businessGoalTemplateId: 'BGT-1',
            version: '1.0',
            author: 'Some Author',
            lastEditedBy: 'Some Author',
            name: 'Goal template Test',
            desc: 'Description x',
            type: 'Completion' as any,
            category: 'PreventiveCare' as any,
            kpiId: 'KPI-1',
            availablePlanGoalTemplateIds: ['PG-1'],
            availablePartnerIds: ['Partner1']
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

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a Business Goal Template', async () => {
            (service.create as jest.Mock).mockResolvedValue(goalTemplateMock);

            await controller.create(mockResponse as Response, dto);
            expect(service.create).toHaveBeenCalledWith(dto);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
        });
    });
    
    describe('findAll', () => {
        it('should return an array of Business Goal Templates', async () => {
            const mockData: BusinessGoalTemplate[] = [ goalTemplateMock ];
            (service.findAll as jest.Mock).mockResolvedValue(mockData);

            const result = await controller.findAll(mockResponse as Response);
            expect(service.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
        });
    });

    describe('findOne', () => {
        it('should find a Business Goal Template by id', async () => {
            (service.findOneById as jest.Mock).mockResolvedValue(goalTemplateMock);

            await controller.findOne(mockResponse as Response, 'BGT-1');
            expect(service.findOneById).toHaveBeenCalledWith('BGT-1');
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
        });
    });
});
