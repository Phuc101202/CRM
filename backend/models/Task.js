import mongoose from "mongoose";

export const TASK_STATUSES = ["Pending", "In Progress", "Completed"];
export const TASK_PRIORITIES = ["Low", "Medium", "High"];

const taskSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, "Please add a title"],
            trim: true,
        },
        description: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: TASK_STATUSES,
            default: "Pending",
            index: true,
        },
        dueDate: {
            type: Date,
            default: null,
        },
        priority: {
            type: String,
            enum: TASK_PRIORITIES,
            default: "Medium",
        },
        relatedLead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            default: null,
        },
        relatedContact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            default: null,
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("Task", taskSchema);