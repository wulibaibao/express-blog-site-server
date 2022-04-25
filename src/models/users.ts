import { today } from "@/utils/util";
import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";
import findOrCreate from "mongoose-findorcreate";

const UsersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    githubId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: String,
        required: true,
        default: today(),
    },
    updatedAt: {
        type: String,
        default: null,
    },
    from: {
        type: String,
        default: "web",
    },
    role: {
        type: Number,
        default: 0,
    },
    html_url: String,
    dispalyName: String,
});

UsersSchema.plugin(findOrCreate);

UsersSchema.pre("updateOne", function (next) {
    this.updatedAt = today();
    next();
});

const User = model("user", UsersSchema, "user");

export default User;
