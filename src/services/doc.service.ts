import { Request } from "express";
import { Doc } from "@/interfaces/docs.interface";

import { DocDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import docs from "@/models/docs";
import { isEmpty } from "@utils/util";

import bads from "@/models/bads";
import views from "@/models/views";
import likes from "@/models/likes";
import comments from "@/models/comments";

class DocService {
    public docs = docs;

    public async findAllDoc(req: Request): Promise<Doc[]> {
        const { size = 10, page = 0, sort, ...rest } = req.query;

        const docs: Doc[] = await this.docs
            .find(rest)
            .populate("author", { nickname: 1, avatar: 1 })
            .populate("channel", { name: 1, _id: 1 })
            .populate({ path: "comments", model: comments })
            .populate({ path: "likes", model: likes })
            .populate({ path: "views", model: views })
            .populate({ path: "bads", model: bads })
            .limit(+size)
            .skip(+page * +size)
            .sort({ name: sort, createdAt: -1 });

        return docs;
    }

    public async findDocById(docId: string): Promise<Doc> {
        if (isEmpty(docId)) throw new HttpException(400, "You're not docId");

        const findDoc: Doc = await this.docs
            .findOne({ _id: docId })
            .populate("author", { nickname: 1, avatar: 1 })
            .populate("channel", { name: 1, _id: 1 })
            .populate({ path: "comments", model: comments })
            .populate({ path: "likes", model: likes })
            .populate({ path: "views", model: views })
            .populate({ path: "bads", model: bads });

        if (!findDoc) throw new HttpException(409, "You're not doc");

        return findDoc;
    }

    public async createDoc(docData: DocDto & { author: string }): Promise<Doc> {
        if (isEmpty(docData)) throw new HttpException(400, "You're not doc");

        const findDocName: Doc = await this.docs.findOne({ title: docData.title });
        if (findDocName)
            throw new HttpException(409, `You're title ${docData.title} already exists`);

        const createDocData: Doc = await this.docs.create(docData);

        return createDocData;
    }

    public async updateDoc(docId: string, docData: DocDto): Promise<Doc> {
        if (isEmpty(docData)) throw new HttpException(400, "You're not docData");

        if (docData.title) {
            const findDoc: Doc = await this.docs.findOne({ title: docData.title });
            if (findDoc && findDoc.id != docId)
                throw new HttpException(409, `You're email ${docData.title} already exists`);
        }

        const updateDocData: Doc = await this.docs.findByIdAndUpdate(docId, docData);
        if (!updateDocData) throw new HttpException(409, "You're not doc");

        return updateDocData;
    }

    public async deleteDoc(docId: string): Promise<Doc> {
        const deleteDocById: Doc = await this.docs.findByIdAndDelete(docId);
        if (!deleteDocById) throw new HttpException(409, "You're not doc");

        return deleteDocById;
    }

    public async listTotal(): Promise<number> {
        const total = await this.docs.count();
        return total;
    }
}

export default DocService;
