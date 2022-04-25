import { today } from "@/utils/util";
import { Schema, model } from "mongoose";

const RegistCodeSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: today(),
    },
});

const RegistCode = model("registCode", RegistCodeSchema, "registCode");

export default RegistCode;
