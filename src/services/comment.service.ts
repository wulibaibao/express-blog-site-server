import { CommentDto } from "./../dtos/users.dto";
import { Comment } from "./../interfaces/docs.interface";
import { Doc } from "@/interfaces/docs.interface";
import { today } from "../utils/util";
import { HttpException } from "@exceptions/HttpException";
import comments from "@/models/comments";
import { isEmpty } from "@utils/util";

class CommentsService {
    public comments = comments;

    public async findAll(from: string): Promise<Comment[]> {
        if (isEmpty(from)) throw new HttpException(400, "you're not from");

        const findAll: Comment[] = await this.comments
            .find({ from })
            .populate("author", { nickname: 1, avatar: 1 });
        return findAll;
    }

    public async findOneById(from: string): Promise<Comment> {
        if (isEmpty(from)) throw new HttpException(400, "you're not from");

        const findComment: Comment = await this.comments.findById(from);
        if (!findComment) throw new HttpException(409, "You're not channel");

        return findComment;
    }

    public async createComment(data: CommentDto & { author: string }): Promise<Comment> {
        const createCommentData: Comment = await this.comments.create(data);
        return createCommentData;
    }

    public async deleteComment(from: string): Promise<Comment> {
        const deleteById: Comment = await this.comments.findByIdAndDelete(from);
        if (!deleteById) throw new HttpException(409, "You're not doc");

        return deleteById;
    }

    public async listTotal(from: string): Promise<number> {
        const total = await this.comments.find({ from }).count();
        return total;
    }
}

export default CommentsService;
