import mongoose from "mongoose";

export const LEAD_STATUSES = ["New", "Qualified", "Proposal","Won","Lost"];
export const LEAD_PRIORITIES = ["Low", "Medium", "High"];

const leadSchema = new mongoose.Schema(
  {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: null,},
    phone: {
        type: String,
        trim: true,
        default: null,
    },
    company: {type: String,
        trim: true,
        default: null,},
        status: {
        type: String,
        enum: LEAD_STATUSES,
        default: "New",
        index: true,
    },
    priority: {
        type: String,
        enum: LEAD_PRIORITIES,
        default: "Medium",
    },
    source: {
        type: String,
        enum: ["Website", "Referral", "Advertisement", "Event","Other"],
        default: "Other",
    },
    notes: {
        type: String,
        default: null,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    value: {
        type: Number,
        default: 0,
        min: 0
    },
    aiSummary: {
        type: String,
        default: null,
    },
    aiRiskScore: {
        type: Number,
        default: null,
    },
    order: {
        type: Number,
        default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.model("Lead", leadSchema);