import { today } from "@/utils/util";
import { Schema, model } from "mongoose";

const ChannelsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    createdAt: {
        type: String,
        default: today(),
    },
    updatedAt: {
        type: String,
    },
});

ChannelsSchema.pre("updateOne", function (next) {
    this.updatedAt = today();
    next();
});

const Channel = model("channel", ChannelsSchema, "channel");

export default Channel;
