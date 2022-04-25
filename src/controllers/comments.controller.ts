import { NextFunction, Request, Response } from "express";
import { Comment } from "@/interfaces/docs.interface";
import CommentService from "@/services/comment.service";

import { CommentDto } from "@/dtos/users.dto";

class CommentsController {
    public commentsService = new CommentService();

    public getAllComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const from: string = req.params.id;
            const data: Comment[] = await this.commentsService.findAll(from);
            const total: number = await this.commentsService.listTotal(from);

            res.status(200).json({
                data,
                total,
                message: "ok",
            });
        } catch (error) {
            next(error);
        }
    };

    public getOneCommentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const from: string = req.params.id;
            const data: Comment = await this.commentsService.findOneById(from);

            res.status(200).json({
                data,
                message: "ok",
            });
        } catch (error) {
            next(error);
        }
    };

    public createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const from: string = req.params.id;
            const author = req.user.id;
            const data: Comment = await this.commentsService.createComment({
                ...req.body,
                from,
                author,
            });

            res.status(200).json({
                data,
                message: "ok",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const from: string = req.params.id;
            const data: Comment = await this.commentsService.deleteComment(from);

            res.status(200).json({
                data,
                message: "ok",
            });
        } catch (error) {
            next(error);
        }
    };
}

export default CommentsController;
