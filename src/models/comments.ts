import { today } from "@/utils/util";
import { model, Schema, Document } from "mongoose";

const Comments = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: today(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "docs",
    },
});

const Comment = model("comments", Comments, "comments");

export default Comment;
