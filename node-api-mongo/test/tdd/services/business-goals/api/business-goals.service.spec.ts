// import { Test, TestingModule } from "@nestjs/testing";
// import { NotFoundException } from "@nestjs/common";

// import { BusinessGoalsService } from "./../../../../../src/services/business-goals/api/business-goals.service";
// import {
//   BUSINESS_GOAL_REPOSITORY,
//   IBusinessGoalRepository,
// } from "./../../../../../src/services/business-goals/domain/interfaces/business-goal-repository.interface";
// import {
//   BusinessGoalCategory,
//   KpiMetric,
//   KpiType,
//   UnitOfMeasure,
// } from "./../../../../../src/services/business-goals/domain/enums";
// import { BusinessGoal } from "./../../../../../src/services/business-goals/domain/entities";

// describe("BusinessGoalsService", () => {
//   let service: BusinessGoalsService;
//   let repository: IBusinessGoalRepository;

//   const mockRepository: IBusinessGoalRepository = {
//     create: jest.fn(),
//     findAll: jest.fn(),
//     findById: jest.fn(),
//     update: jest.fn(),
//     delete: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         BusinessGoalsService,
//         {
//           provide: BUSINESS_GOAL_REPOSITORY,
//           useValue: mockRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<BusinessGoalsService>(BusinessGoalsService);
//     repository = module.get<IBusinessGoalRepository>(BUSINESS_GOAL_REPOSITORY);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("createBusinessGoal", () => {
//     it("should create a new business goal", async () => {
//       const dto = {
//         name: "Test goal 1",
//         description: "Description 1",
//         category: "Preventive Care" as BusinessGoalCategory,
//         start: new Date("2025-01-01"),
//         end: new Date("2025-12-31"),
//         activitySum: 100,
//         unitOfMeasure: "Percentage" as UnitOfMeasure,
//         metric: "NotStarted" as KpiMetric,
//         type: "Engagement" as KpiType,
//       };

//       const createdGoal: BusinessGoal = {
//         id: "1",
//         ...dto,
//         kpis: [],
//       };

//       (repository.create as jest.Mock).mockResolvedValue(createdGoal);

//       const result = await service.createBusinessGoal(dto as any);
//       expect(repository.create).toHaveBeenCalled();
//       expect(result).toEqual(createdGoal);
//     });
//   });

//   describe("getAllBusinessGoals", () => {
//     it("should return an array of business goals", async () => {
//       const goals: BusinessGoal[] = [
//         {
//           id: "1",
//           name: "Test 1",
//           description: "",
//           category: "Preventive Care",
//         } as BusinessGoal,
//         {
//           id: "2",
//           name: "Test 2",
//           description: "",
//           category: "Cost Saving",
//         } as BusinessGoal,
//       ];

//       (repository.findAll as jest.Mock).mockResolvedValue(goals);

//       const result = await service.getAllBusinessGoals();
//       expect(repository.findAll).toHaveBeenCalled();
//       expect(result).toEqual(goals);
//     });
//   });

//   describe("getBusinessGoalById", () => {
//     it("should return  single business goal", async () => {
//       const goal: BusinessGoal = {
//         id: "xyz987",
//         name: "Test 1",
//         description: "",
//         category: "Preventive Care",
//       } as BusinessGoal;

//       (repository.findById as jest.Mock).mockResolvedValue(goal);

//       const result = await service.getBusinessGoalsById("xyz987");
//       expect(repository.findById).toHaveBeenCalled();
//       expect(result).toEqual(goal);
//     });

//     it("should throw NotFoundException if goal not found", async () => {
//       (repository.findById as jest.Mock).mockResolvedValue(null);

//       await expect(service.getBusinessGoalsById("invalid")).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe("updateBusinessGoal", () => {
//     it("should update a business goal and return the updated version", async () => {
//       const updates = { name: "Updated name" };
//       const updatedGoal: BusinessGoal = {
//         id: "123",
//         name: "Updated name",
//       } as BusinessGoal;

//       (repository.update as jest.Mock).mockResolvedValue(updatedGoal);

//       const result = await service.updateBusinessGoal("123", updates);
//       expect(repository.update).toHaveBeenCalledWith(
//         "123",
//         expect.objectContaining(updates),
//       );
//       expect(result).toEqual(updatedGoal);
//     });

//     it("should throw NotFoundException if update returns null", async () => {
//       (repository.update as jest.Mock).mockResolvedValue(null);

//       await expect(service.updateBusinessGoal("missingId", {})).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe("deleteBusinessGoal", () => {
//     it("should delete and return the deleted business goal", async () => {
//       const deletedGoal: BusinessGoal = { id: "toDelete" } as BusinessGoal;

//       (repository.delete as jest.Mock).mockResolvedValue(deletedGoal);

//       const result = await service.deleteBusinessGoal("toDelete");
//       expect(repository.delete).toHaveBeenCalledWith("toDelete");
//       expect(result).toEqual(deletedGoal);
//     });

//     it("should throw NotFoundException if delete returns null", async () => {
//       (repository.delete as jest.Mock).mockResolvedValue(null);

//       await expect(service.deleteBusinessGoal("noId")).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });
