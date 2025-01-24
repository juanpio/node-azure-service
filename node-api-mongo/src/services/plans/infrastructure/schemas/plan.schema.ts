import { Status } from "@src/common/enums/status.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BusinessGoalCategory } from "@src/services/templates/domain/enums/businessgoal-category.enum";
import { MongoCollections } from "@src/common/database/mongo-collections.constants";
import { IncentiveType } from "../../domain/enums/incentivetype.enum";
import { ActivityType } from "@src/services/templates/domain/enums/activitytype.enum";
import { PlanGoalCategory } from "@src/services/templates/domain/enums/plangoal-category.enum";

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

export class IncentiveModel {
  @Prop({ type: Number, required: true })
  amount!: number;

  @Prop({ enum: IncentiveType, required: true })
  type!: IncentiveType;
}

export class PlanGoalModel {
  @Prop({ type: String, required: true })
  public planGoalId!: string;

  @Prop({ type: String, required: true })
  public planGoalTemplateId!: string;

  @Prop({ type: String, required: true })
  public name!: string;

  @Prop({ type: String, required: true })
  public desc!: string;

  @Prop({ enum: BusinessGoalCategory, required: true })
  public category!: PlanGoalCategory;

  @Prop({ enum: ActivityType, required: true })
  public activityType!: ActivityType;

  @Prop({ type: String, required: true })
  public rule!: string;

  @Prop({ type: Number, required: true })
  public ruleTarget!: number;

  @Prop({ type: [String], default: [], required: true })
  public kpiIds!: string[];

  @Prop({ type: [String], default: [], required: true })
  public partnerIds!: string[];

  @Prop({ type: Date, required: true })
  public start!: Date;

  @Prop({ type: Date, required: true })
  public end!: Date;

  @Prop({ enum: Status, required: true })
  public status!: Status;

  @Prop({ type: IncentiveModel, required: true })
  public incentive!: IncentiveModel;

  @Prop({ type: String })
  public eligibilityRule?: string;
}

@Schema({ collection: MongoCollections.PLANS, ...config })
export class PlanModel {
  @Prop({ type: String, required: true })
  public planId!: string;

  @Prop({ type: String, required: true })
  public clientId!: string;

  @Prop({ type: String, required: true })
  public programId!: string;

  @Prop({ type: String, required: true })
  public name!: string;

  @Prop({ type: String, required: true })
  public desc!: string;

  @Prop({ type: Date, required: true })
  public start!: Date;

  @Prop({ type: Date, required: true })
  public end!: Date;

  @Prop({ type: String, required: true })
  public status!: Status;

  @Prop({ type: Number, required: true })
  public budget!: number;

  @Prop({ type: Number, required: true })
  public maxMemberPayout!: number;

  @Prop({ type: PlanGoalModel, required: true })
  public goals!: PlanGoalModel[];
}

export type PlanDocument = HydratedDocument<PlanModel>;
export const PlanSchema = SchemaFactory.createForClass(PlanModel);
