import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: [true, "Please add contact name"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: null,
    },
    phone: {
        type: String,
        trim: true,
        default: null,
    },
    company: {
        type: String,
        trim: true,
        default: null,
    },
    title: {
        type: String,
        trim: true,
        default: null,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    notes: {
        type: String,
        default: null,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ name: "text", email: "text", company: "text" });

export const Contact = mongoose.model("Contact", contactSchema);