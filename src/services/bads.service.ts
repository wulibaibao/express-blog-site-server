import { HttpException } from "@exceptions/HttpException";
import bads from "@/models/bads";
import { isEmpty } from "@utils/util";

type Like = {
    from?: string;
    author?: any;
    createdAt?: string;
};

class DocService {
    public bads = bads;

    public async findAll(from: string): Promise<Like[]> {
        if (isEmpty(from)) throw new HttpException(400, "you're not from");
        const findAll: Like[] = await this.bads
            .find({ from })
            .populate("author", { nickname: 1, avatar: 1 });
        return findAll;
    }

    public async create(data: { from: string; author: string }): Promise<Like> {
        if (isEmpty(data.from)) throw new HttpException(400, "You're not doc");
        const createData: Like = await this.bads.create(data);
        return createData;
    }

    public async total(from: string): Promise<number> {
        const total = await this.bads.find({ from }).count();
        return total;
    }
}

export default DocService;
