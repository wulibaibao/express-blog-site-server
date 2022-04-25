import { today } from "./../utils/util";
import mongoose from "mongoose";

const Docs = new mongoose.Schema(
    {
        title: String, //标题
        content: String, //内容
        cover: String, //封面
        //类型
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "channel",
        },
        //创建时间
        createdAt: {
            type: String,
            default: today(),
        },
        //更新时间
        updatedAt: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        status: Boolean,
    },
    {
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true }, // So `toObject()` output includes virtuals
    },
);

Docs.virtual("comments", {
    ref: "comment",
    localField: "_id",
    foreignField: "from",
    justOne: false,
    count: true,
});

Docs.virtual("likes", {
    ref: "likes",
    localField: "_id",
    foreignField: "from",
    justOne: false,
    count: true,
});

Docs.virtual("views", {
    ref: "views",
    localField: "_id",
    foreignField: "from",
    justOne: false,
    count: true,
});

Docs.virtual("bads", {
    ref: "bads",
    localField: "_id",
    foreignField: "from",
    justOne: false,
    count: true,
});

Docs.methods.getViews = function () {
    return this.model("visitor")
        .find({
            from: new RegExp(`/u/${this._id}`),
        })
        .count();
};

Docs.pre("updateOne", function (next) {
    this.updatedAt = today();
    next();
});

const Doc = mongoose.model("docs", Docs, "docs");

export default Doc;
