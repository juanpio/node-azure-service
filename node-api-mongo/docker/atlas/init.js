const MongoCollections = {
  PROGRAMS: "programs",
  PLANS: "plans",
  BUSINESS_GOAL_TEMPLATES: "business_goal_templates",
  PLAN_GOAL_TEMPLATES: "plan_goal_templates",
  PLAN_GOAL_RECOMMENDATIONS: "plan_goal_recommendations",
  PARTNERS: "partners",
}; // TODO: sync with MongoCollections constants file

db = db.getSiblingDB("iep");

db.createCollection(MongoCollections.PLAN_GOAL_TEMPLATES); // TODO: Validation

db[MongoCollections.PLAN_GOAL_TEMPLATES].insertMany([
  {
    planGoalTemplateId: "UUID-FOR-ANNUAL-DENTAL-CHECKUP-TEMPLATE",
    version: 1,
    author: "oshalev@healthequity.com",
    lastEditedBy: "oshalev@healthequity.com",
    name: "Complete an Annual Dental Checkup",
    desc: "",
    category: "Preventative",
    activityType: "AnnualDentalCheckup",
    rule: {}, // TODO:
    ruleTarget: 50, // TODO: verify if is correct
    businessGoalCategory: "Preventative Care",
    kpiIds: ["UUID-FOR-ANNUAL-DENTAL-CHECKUP-COMPLETION-KPI"],
    partnerIds: ["UUID-FOR-CLASSIC-CLAIMS"],
    eligibilityRule: '{"member_id": "ABC123","age":"45"}',
  },
]);

db.createCollection(MongoCollections.BUSINESS_GOAL_TEMPLATES);

db[MongoCollections.BUSINESS_GOAL_TEMPLATES].insertMany([
  {
    businessGoalTemplateId: "UUID-FOR-PREVENTATIVE-CARE-COMPLETION-TEMPLATE",
    version: 1,
    author: "oshalev@healthequity.com",
    lastEditedBy: "oshalev@healthequity.com",
    name: "Preventative Care Completion",
    desc: "Driving employees to engage in forward-thinking health care to improve long-term health",
    type: "Completion",
    category: "Preventative Care",
    kpiId: "UUID-FOR-PREVENTATIVE-CARE-COMPLETION-KPI",
    availablePlanGoalTemplateIds: ["UUID-FOR-ANNUAL-DENTAL-CHECKUP-TEMPLATE"],
    availablePartnerIds: [
      "UUID-FOR-CLASSIC-CLAIMS",
      "UUID-FOR-APPLE-HEALTHKIT",
      "UUID-FOR-GOOGLE-FIT",
    ],
    aiDescription: "Reccommended target evaluated using AI",
  },
]);

db.createCollection(MongoCollections.PROGRAMS);

db[MongoCollections.PROGRAMS].insertMany([
  {
    programId: "UUID-FOR-SKYHOOK-PREVENTATIVE",
    clientId: "skyhook",
    name: "Skyhook Preventive Care Initiative",
    desc: "Driving employees to engage in forward-thinking health care to improve long-term health",
    start: new Date("2025-01-01"),
    end: new Date("2025-12-31"),
    status: "Active",
    businessGoals: [
      {
        businessGoalId: "UUID-FOR-PREVENTATIVE-CARE-COMPLETION",
        businessGoalTemplateId:
          "UUID-FOR-PREVENTATIVE-CARE-COMPLETION-TEMPLATE",
        name: "Preventative Care Completion",
        desc: "Driving employees to engage in forward-thinking health care to improve long-term health",
        type: "Completion",
        category: "Preventative Care",
        kpiId: "UUID-FOR-PREVENTATIVE-CARE-COMPLETION-KPI",
        start: new Date("2025-01-01"),
        end: new Date("2026-01-01"),
        status: "Active",
        target: {
          type: "Percentage",
          value: 65,
        },
        aiDescription: "Reccommended target evaluated using AI",
      },
    ],
    businessGoalPriority: ["UUID-FOR-PREVENTATIVE-CARE-COMPLETION"],
  },
  {
    programId: "UUID-FOR-SKYHOOK-PREVENTIVE",
    clientId: "skyhook",
    name: "Skyhook Wellness Initiative",
    desc: "Driving employees to engage in forward-thinking health care to improve wellness",
    start: new Date("2025-01-01"),
    end: new Date("2026-01-01"),
    status: "Active",
    businessGoals: [],
    businessGoalPriority: [],
  },
]);

db.createCollection(MongoCollections.PLANS);

db[MongoCollections.PLANS].insertMany([
  {
    planId: "UUID-FOR-ANNUAL-DENTAL-CHECKUP-PLAN",
    clientId: "skyhook",
    programId: "UUID-FOR-SKYHOOK-PREVENTATIVE",
    name: "Skyhook Preventive Care FY 2025",
    desc: "2025 Improving health care for all Skyhook employees lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis quam ac massa auctor, porttitor tincidunt eros scelerisque. Suspendisse massa urna, dignissim in accumsan sed.",
    start: new Date("2025-01-01"),
    end: new Date("2026-01-01"),
    status: "Active",
    budget: 125800,
    maxMemberPayout: 1500,
    goals: [
      {
        planGoalId: "UUID-FOR-ANNUAL-DENTAL-CHECKUP-GOAL",
        planGoalTemplateId: "UUID-FOR-ANNUAL-DENTAL-CHECKUP-TEMPLATE",
        name: "Complete an Annual Dental Checkup",
        desc: "",
        category: "Preventative",
        activityType: "AnnualDentalCheckup",
        rule: {}, // TODO:
        ruleTarget: 50, // TODO: verify if is correct
        kpiIds: ["UUID-FOR-ANNUAL-DENTAL-CHECKUP-COMPLETION-KPI"],
        partnerIds: ["UUID-FOR-CLASSIC-CLAIMS"],
        start: new Date("2025-01-01"),
        end: new Date("2026-01-01"),
        status: "Active",
        incentive: {
          amount: 100,
          type: "Cash",
        },
        eligibilityRule: '{"member_id": "ABC123","age":"45"}',
      },
    ],
  },
]);

db.createCollection(MongoCollections.PARTNERS);

db[MongoCollections.PARTNERS].insertMany([
  {
    partnerId: "UUID-FOR-CLASSIC-CLAIMS",
    name: "Classic Claims",
    desc: "Internal claims system",
    activityTypes: [
      "AnnualDentalCheckup",
      "AnnualWellnessScreening",
      "Colonoscopy",
    ],
    categories: ["Preventitive", "Wellness"],
  },
  {
    partnerId: "UUID-FOR-APPLE-HEALTHKIT",
    name: "Apple HealthKit",
    desc: "Apple HealthKit",
    activityTypes: ["Walking"],
    categories: ["Movement"],
  },
  {
    partnerId: "UUID-FOR-GOOGLE-FIT",
    name: "Google Fit",
    desc: "Google Fit",
    activityTypes: ["Walking"],
    categories: ["Movement"],
  },
]);

db.createCollection(MongoCollections.PLAN_GOAL_RECOMMENDATIONS);

db[MongoCollections.PLAN_GOAL_RECOMMENDATIONS].insertMany([
  {
    programId: "UUID-FOR-SKYHOOK-PREVENTATIVE",
    planGoalTemplateIds: ["UUID-FOR-ANNUAL-DENTAL-CHECKUP-TEMPLATE"], // ordered by ai
    timeStamp: new Date(),
  },
]);

db.createUser({
  user: "admin",
  pwd: "secret",
  roles: [
    {
      role: "readWrite",
      db: "iep",
    },
  ],
});
