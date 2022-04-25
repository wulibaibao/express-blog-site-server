import { Schema, model } from "mongoose";
import { today } from "@/utils/util";

const ViewsSchema = new Schema({
    ip: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    city_code: {
        type: String,
    },
    province: {
        type: String,
    },
    district: {
        type: String,
    },
    from: {
        type: String,
    },
    street_number: {
        type: String,
    },
    createdAt: {
        type: String,
        default: today(),
    },
});

const Views = model("views", ViewsSchema, "views");

export default Views;
