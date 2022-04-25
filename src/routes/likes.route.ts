import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import LikesController from '@controllers/likes.controller';

class LikesRoute implements Routes {
    public path = '/likes';
    public router = Router();
    public likesController = new LikesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/:id`, this.likesController.create);
        this.router.get(`${this.path}/:id`, this.likesController.findAll);
    }
}

export default LikesRoute;
