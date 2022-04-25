import { HttpException } from "@exceptions/HttpException";
import likes from "@/models/likes";
import { isEmpty } from "@utils/util";

type Like = {
    from?: string;
    author?: string;
    createdAt?: string;
};

class DocService {
    public likes = likes;

    public async findAll(from: string): Promise<Like[]> {
        if (isEmpty(from)) throw new HttpException(400, "you're not from");
        const findAll: Like[] = await this.likes
            .find({ from })
            .populate("author", { nickname: 1, avatar: 1 });
        return findAll;
    }

    public async create(from, data: { author: string }): Promise<Like> {
        if (isEmpty(from)) throw new HttpException(400, "You're not doc");
        const createData: Like = await this.likes.create(data);
        return createData;
    }

    public async total(from: string): Promise<number> {
        const total = await this.likes.find({ from }).count();
        return total;
    }
}

export default DocService;
