import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import BadsController from "@controllers/likes.controller";
import authMiddleware from "@middlewares/auth.middleware";

class BadsRoute implements Routes {
    public path = "/bads";
    public router = Router();
    public badsController = new BadsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/:id`, this.badsController.create);
        this.router.get(`${this.path}/:id`, this.badsController.findAll);
    }
}

export default BadsRoute;
