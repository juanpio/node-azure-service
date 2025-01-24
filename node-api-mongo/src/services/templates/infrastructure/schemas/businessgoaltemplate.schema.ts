import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
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

@Schema({ collection: MongoCollections.BUSINESS_GOAL_TEMPLATES, ...config })
export class BusinessGoalTemplateModel {
  public static readonly SchemaVersion = 1;

  @Prop({ type: String, required: true })
  businessGoalTemplateId!: string;

  @Prop({ type: String, required: true })
  version!: string;

  @Prop({ type: String, required: true })
  author!: string;

  @Prop({ type: String, required: true })
  lastEditedBy!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  desc!: string;

  @Prop({
    enum: BusinessGoalType,
    required: true,
  })
  type!: BusinessGoalType;

  @Prop({
    enum: BusinessGoalCategory,
    required: true,
  })
  category!: BusinessGoalCategory;

  @Prop({ type: String, required: true })
  kpiId!: string;

  @Prop({ type: [String], default: [] })
  availablePlanGoalTemplateIds!: string[];

  @Prop({ type: [String], default: [] })
  availablePartnerIds!: string[];

  @Prop({ type: String })
  aiDescription?: string;
}

export type BusinessGoalTemplateDocument =
  HydratedDocument<BusinessGoalTemplateModel>;
export const BusinessGoalTemplateSchema = SchemaFactory.createForClass(
  BusinessGoalTemplateModel,
);
