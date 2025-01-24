import { Test, TestingModule } from "@nestjs/testing";
import { BusinessGoal } from "@src/services/business-goals/domain/business-goal";
import { BusinessGoalMongo } from "@src/services/business-goals/infra/database/mongodb/schemas/business-goal.schema";
import { getModelToken } from "@nestjs/mongoose";
import { MongoBusinessGoalMapper } from "@src/services/business-goals/infra/database/mongodb/repositories/mongo-business-goal.mapper";
import { BusinessGoalsRepository } from "@src/services/business-goals/infra/database/mongodb/repositories/business-goals.repository";

jest.mock(
  "@src/services/business-goals/infra/database/mongodb/repositories/mongo-business-goal.mapper",
);

describe("BusinessGoalsRepository", () => {
  let repository: BusinessGoalsRepository;
  //let model: Model<BusinessGoalMongoDocument>;
  let mapper: jest.Mocked<typeof MongoBusinessGoalMapper>;

  const mockModel = {
    new: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    mapper = MongoBusinessGoalMapper as jest.Mocked<
      typeof MongoBusinessGoalMapper
    >;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessGoalsRepository,
        {
          provide: getModelToken(BusinessGoalMongo.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<BusinessGoalsRepository>(BusinessGoalsRepository);
    // model = module.get<Model<BusinessGoalMongoDocument>>(
    //   getModelToken(BusinessGoalMongo.name),
    // );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("repositoryFindAll", () => {
    it("should return all Business Goals", async () => {
      const documents = [{ _id: "1" }, { _id: "2" }];
      (mockModel.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(documents),
      });
      mapper.toDomain.mockImplementation(
        (doc: any) => ({ id: doc._id }) as BusinessGoal,
      );

      const result = await repository.findAll();
      expect(mockModel.find).toHaveBeenCalled();
      expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    });
  });

  describe("repositoryUpdate", () => {
    it("should update a Business Goal", async () => {
      const partial = { name: "Updated name" };
      const mappedDoc = { name: "Mapped document" };
      mapper.toMongoDocument.mockReturnValue(mappedDoc as any);

      const returnedDoc = {
        _id: "67894d27db5dc57e2af93964",
        name: "Updated name",
      };
      (mockModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(returnedDoc),
      });
      mapper.toDomain.mockReturnValue({
        id: "67894d27db5dc57e2af93964",
        name: "Updated name",
      } as any);

      const result = await repository.update(
        "67894d27db5dc57e2af93964",
        partial as any,
      );
      expect(mapper.toMongoDocument).toHaveBeenCalledWith(partial);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "67894d27db5dc57e2af93964",
        mappedDoc,
        { new: true },
      );
      expect(result).toEqual({
        id: "67894d27db5dc57e2af93964",
        name: "Updated name",
      });
    });

    it("should return null if document not found", async () => {
      (mockModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await repository.update("67894d27db5dc57e2af93964", {
        name: "No name",
      });
      expect(result).toBe(null);
    });
  });

  describe("repositoryDelete", () => {
    it("should delete a Business Goal and return the domain goal", async () => {
      const document = { _id: "67894d27db5dc57e2af93964" };
      (mockModel.findByIdAndDelete as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(document),
      });
      mapper.toDomain.mockReturnValue({
        id: "67894d27db5dc57e2af93964",
      } as any);

      const result = await repository.delete("67894d27db5dc57e2af93964");
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(
        "67894d27db5dc57e2af93964",
      );
      expect(result).toEqual({ id: "67894d27db5dc57e2af93964" });
    });

    it("should return null if document not found", async () => {
      (mockModel.findByIdAndDelete as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await repository.delete("67894d27db5dc57e2af93964");
      expect(result).toBe(null);
    });
  });
});
