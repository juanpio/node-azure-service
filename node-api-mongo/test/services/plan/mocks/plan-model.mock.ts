export const planModelMock = {
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  deleteOne: jest.fn(),
};
