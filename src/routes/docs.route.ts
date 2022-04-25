import { Router } from "express";
import docsController from "@/controllers/docs.controller";
import { DocDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";

class DocRoute implements Routes {
    public path = "/doc";
    public router = Router();
    public docsController = new docsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.docsController.getDocs);
        this.router.get(`${this.path}/:id`, this.docsController.getDocsById);
        this.router.post(
            `${this.path}`,
            authMiddleware,
            validationMiddleware(DocDto, "body"),
            this.docsController.createDoc,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(DocDto, "body", true),
            this.docsController.updateDoc,
        );
        this.router.delete(`${this.path}/:id`, authMiddleware, this.docsController.deleteDoc);
    }
}

export default DocRoute;
