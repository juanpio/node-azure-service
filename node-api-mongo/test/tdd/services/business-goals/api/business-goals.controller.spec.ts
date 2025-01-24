import { Test, TestingModule } from "@nestjs/testing";
import { BusinessGoalsController } from "@src/services/business-goals/api/business-goals.controller";
import { BusinessGoalsService } from "@src/services/business-goals/business-goals.service";
import { CreateBusinessGoalDto } from "@src/services/businessgoals/api/dtos/createbusinessgoal.dto";
import { BusinessGoalMapper } from "@src/services/businessgoals/api/mappers/businessgoal.mapper";

describe("BusinessGoalsController", () => {
  let controller: BusinessGoalsController;
  let service: Partial<BusinessGoalsService>;

  beforeEach(async () => {
    service = {
      createBusinessGoal: jest.fn(),
      getAllBusinessGoals: jest.fn(),
      getBusinessGoalsById: jest.fn(),
      updateBusinessGoal: jest.fn(),
      deleteBusinessGoal: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessGoalsController],
      providers: [
        {
          provide: BusinessGoalsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<BusinessGoalsController>(BusinessGoalsController);
  });

  describe("init", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe("create", () => {
    it("should create a business goal", async () => {
      const dto: CreateBusinessGoalDto = {
        name: "Test Goal Controller",
        description: "Description content",
        category: "Preventive Care" as any,
        start: new Date(),
        end: new Date(),
        activitySum: 100,
        unitOfMeasure: "Percentage" as any,
        metric: "NotStarted" as any,
        type: "Engagement" as any,
      };

      const createdDocument = { _id: "qwe987", name: "Test Goal Controller" };
      (service.createBusinessGoal as jest.Mock).mockResolvedValue(
        createdDocument,
      );

      const mapperSpy = jest
        .spyOn(BusinessGoalMapper, "toResponseEntity")
        .mockReturnValue({ id: "qwe987", name: "Test Goal Controller" });

      const result = await controller.create(dto);
      expect(service.createBusinessGoal).toHaveBeenCalledWith(dto);
      expect(mapperSpy).toHaveBeenCalledWith(createdDocument);
      expect(result).toEqual({ id: "qwe987", name: "Test Goal Controller" });
    });
  });

  describe("getAllBusinessGoals", () => {
    it("should get all business goals", async () => {
      const goals = [{ id: "1" }, { id: "2" }];
      (service.getAllBusinessGoals as jest.Mock).mockResolvedValue(goals);

      jest
        .spyOn(BusinessGoalMapper, "toResponseEntity")
        .mockImplementation((entity: any) => ({ id: entity.id }));

      const result = await controller.findAll();
      expect(service.getAllBusinessGoals).toHaveBeenCalled();
      expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    });
  });

  describe("getBusinessGoalById", () => {
    it("should get a business goal by id", async () => {
      const goal = { _id: "6789146ef19eb69a809f694c", name: "Single Goal" };
      (service.getBusinessGoalsById as jest.Mock).mockResolvedValue(goal);

      jest.spyOn(BusinessGoalMapper, "toResponseEntity").mockReturnValue({
        id: "6789146ef19eb69a809f694c",
        name: "Single Goal",
      });

      const result = await controller.findOne("6789146ef19eb69a809f694c");
      expect(service.getBusinessGoalsById).toHaveBeenCalledWith(
        "6789146ef19eb69a809f694c",
      );
      expect(result).toEqual({
        id: "6789146ef19eb69a809f694c",
        name: "Single Goal",
      });
    });
  });

  describe("update", () => {
    it("should update a business goal", async () => {
      const dto: UpdateBusinessGoalDto = { name: "Updated from Controller" };
      const updatedDocument = {
        _id: "67894b68ef24554efb6781d4",
        name: "Updated from Controller",
      };
      (service.updateBusinessGoal as jest.Mock).mockResolvedValue(
        updatedDocument,
      );

      jest.spyOn(BusinessGoalMapper, "toResponseEntity").mockReturnValue({
        id: "67894b68ef24554efb6781d4",
        name: "Updated from Controller",
      });

      const result = await controller.update("67894b68ef24554efb6781d4", dto);
      expect(service.updateBusinessGoal).toHaveBeenCalledWith(
        "67894b68ef24554efb6781d4",
        dto,
      );
      expect(result).toEqual({
        id: "67894b68ef24554efb6781d4",
        name: "Updated from Controller",
      });
    });
  });

  describe("delete", () => {
    it("should delete a business goal", async () => {
      const deletedDocument = {
        id: "67894b7c1108fcbda2bfeb53",
        name: "Deleted",
      };
      (service.deleteBusinessGoal as jest.Mock).mockResolvedValue(
        deletedDocument,
      );

      jest
        .spyOn(BusinessGoalMapper, "toResponseEntity")
        .mockReturnValue({ id: "67894b7c1108fcbda2bfeb53", name: "Deleted" });

      const result = await controller.remove("67894b7c1108fcbda2bfeb53");
      expect(service.deleteBusinessGoal).toHaveBeenCalledWith(
        "67894b7c1108fcbda2bfeb53",
      );
      expect(result).toEqual({
        id: "67894b7c1108fcbda2bfeb53",
        name: "Deleted",
      });
    });
  });
});
