import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please add a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false, 
    },
    role: {
        type: String,
        enum: ["owner", "member"],
        default: "owner",
    },
    company: {
        type: String,
        trim: true,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);