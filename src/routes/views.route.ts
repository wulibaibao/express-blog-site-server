import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ViewsController from '@controllers/likes.controller';
import authMiddleware from '@middlewares/auth.middleware';

class ViewsRoute implements Routes {
    public path = '/views';
    public router = Router();
    public viewsController = new ViewsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/:id`, this.viewsController.create);
        this.router.get(`${this.path}/:id`, this.viewsController.findAll);
    }
}

export default ViewsRoute;
