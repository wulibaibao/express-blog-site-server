import { Schema, model } from "mongoose";
import { today } from "@/utils/util";

const Likes = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "docs",
    },
    createdAt: {
        type: String,
        default: today(),
    },
});

const documentLike = model("likes", Likes, "likes");

export default documentLike;
