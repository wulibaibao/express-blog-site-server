import { CommentDto } from "./../dtos/users.dto";
import validationMiddleware from "@middlewares/validation.middleware";
import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import CommentsController from "@controllers/comments.controller";
import authMiddleware from "@middlewares/auth.middleware";

class CommentsRoute implements Routes {
    public path = "/comment";
    public router = Router();
    public commentsController = new CommentsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(CommentDto, "body"),
            this.commentsController.createComment,
        );
        this.router.get(`${this.path}/:id`, this.commentsController.getAllComment);
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.commentsController.deleteComment,
        );
    }
}

export default CommentsRoute;
