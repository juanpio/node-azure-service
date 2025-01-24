import { Status } from "@src/common/enums/status.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UnitOfMeasure } from "../../domain/enums/unitofmeasure.enum";
import { BusinessGoalType } from "@src/services/templates/domain/enums/businessgoal-type.enum";
import { BusinessGoalCategory } from "@src/services/templates/domain/enums/businessgoal-category.enum";
import { MongoCollections } from "@src/common/database/mongo-collections.constants";

let config = {};

if (process.env.NODE_ENV === "production") {
  config = {
    autoIndex: false,
    read: "p",
    timestamps: { createdAt: "cat", updatedAt: "uat" },
  };
} else {
  config = {
    autoIndex: false,
    timestamps: { createdAt: "cat", updatedAt: "uat" },
  };
}

export class BusinessGoalTargetModel {
  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ enum: UnitOfMeasure, required: true })
  unitOfMeasure: UnitOfMeasure;
}

export class BusinessGoalModel {
  @Prop({ type: String, required: true })
  public businessGoalId!: string;

  @Prop({ type: String, required: true })
  public businessGoalTemplateId!: string;

  @Prop({ type: String, required: true })
  public name!: string;

  @Prop({ type: String, required: true })
  public desc!: string;

  @Prop({ enum: BusinessGoalType, required: true })
  public type!: BusinessGoalType;

  @Prop({ enum: BusinessGoalCategory, required: true })
  public category!: BusinessGoalCategory;

  @Prop({ type: String, required: true })
  public kpiId!: string;

  @Prop({ type: Date, required: true })
  public start!: Date;

  @Prop({ type: Date, required: true })
  public end!: Date;

  @Prop({ enum: Status, required: true })
  status!: Status;

  @Prop({ type: BusinessGoalTargetModel })
  target?: BusinessGoalTargetModel;

  @Prop({ type: String })
  aiDescription?: string;
}

@Schema({ collection: MongoCollections.PROGRAMS, ...config })
export class ProgramModel {
  @Prop({ type: String, required: true })
  public programId!: string;

  @Prop({ type: String, required: true })
  public clientId!: string;

  @Prop({ type: String, required: true })
  public name!: string;

  @Prop({ type: String, required: true })
  public desc!: string;

  @Prop({ type: [BusinessGoalModel], default: [] })
  public businessGoals!: BusinessGoalModel[];

  @Prop({ type: [String], default: [] })
  public businessGoalPriority!: string[];

  @Prop({ enum: Status, required: true })
  public status!: Status;

  @Prop({ type: Date, required: true })
  public start!: Date;

  @Prop({ type: Date })
  public end?: Date;
}

export type ProgramDocument = HydratedDocument<ProgramModel>;
export const ProgramSchema = SchemaFactory.createForClass(ProgramModel);