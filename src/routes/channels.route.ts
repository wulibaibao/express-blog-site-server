import { Router } from "express";
import channelsController from "@/controllers/channels.controller";
import { ChannelDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";

class ChannelRoute implements Routes {
    public path = "/channel";
    public router = Router();
    public channelsController = new channelsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.channelsController.getChannels);
        this.router.get(`${this.path}/:id`, this.channelsController.getChannelsById);
        this.router.post(
            `${this.path}`,
            authMiddleware,
            validationMiddleware(ChannelDto, "body"),
            this.channelsController.createChannel,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(ChannelDto, "body", true),
            this.channelsController.updateChannel,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.channelsController.deleteChannel,
        );
    }
}

export default ChannelRoute;
