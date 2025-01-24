import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { PlanGoalCategory } from "@src/services/templates/domain/enums/plangoal-category.enum";
import { MongoCollections } from "@src/common/database/mongo-collections.constants";
import { BusinessGoalCategory } from "../../domain/enums/businessgoal-category.enum";
import { ActivityType } from "../../domain/enums/activitytype.enum";

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

@Schema({ collection: MongoCollections.PLAN_GOAL_TEMPLATES, ...config })
export class PlanGoalTemplateModel {
  public static readonly SchemaVersion = 1;

  @Prop({ type: String, required: true })
  planGoalTemplateId: string;

  @Prop({ type: String, required: true })
  version: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String, required: true })
  lastEditedBy: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  desc: string;

  @Prop({
    enum: PlanGoalCategory,
    required: true,
  })
  category: PlanGoalCategory;

  @Prop({
    enum: ActivityType,
    required: true,
  })
  activityType: ActivityType;

  @Prop({ type: String, required: true })
  rule: string;

  @Prop({ type: Number, required: true })
  ruleTarget: number;

  @Prop({
    enum: BusinessGoalCategory,
    required: true,
  })
  businessGoalCategory: BusinessGoalCategory;

  @Prop({ type: [String], default: [] })
  kpiIds: string[];

  @Prop({ type: [String], default: [] })
  partnerIds: string[];

  @Prop({ type: String })
  eligibilityRule?: string;
}

export type PlanGoalTemplateDocument = HydratedDocument<PlanGoalTemplateModel>;
export const PlanGoalTemplateSchema = SchemaFactory.createForClass(
  PlanGoalTemplateModel,
);
