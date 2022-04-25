import { today } from "@/utils/util";
import { model, Schema } from "mongoose";

const BadsSchema = new Schema({
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

const Bads = model("bads", BadsSchema, "bads");

export default Bads;
