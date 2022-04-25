import { HttpException } from "@exceptions/HttpException";
import views from "@/models/views";
import { isEmpty } from "@utils/util";

type Like = {
    from?: string;
    author?: string;
    createdAt?: string;
};

class DocService {
    public views = views;

    public async findAll(from: string): Promise<Like[]> {
        if (isEmpty(from)) throw new HttpException(400, "you're not from");
        const findAll: Like[] = await this.views
            .find({ from })
            .populate("author", { nickname: 1, avatar: 1 });
        return findAll;
    }

    public async create(from, data: { author: string }): Promise<Like> {
        if (isEmpty(from)) throw new HttpException(400, "You're not doc");
        const createData: Like = await this.views.create(data);
        return createData;
    }

    public async total(from: string): Promise<number> {
        const total = await this.views.find({ from }).count();
        return total;
    }
}

export default DocService;
