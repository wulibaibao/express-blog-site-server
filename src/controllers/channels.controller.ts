import { NextFunction, Request, Response } from "express";
import { Channel } from "@/interfaces/channels.interface";
import channelService from "@/services/channel.service";
import { ChannelDto } from "@dtos/users.dto";

class ChannelsController {
    public channelService = new channelService();

    public getChannels = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: Channel[] = await this.channelService.findAllChannel(req);
            const total: number = await this.channelService.listTotal();
            res.status(200).json({ data: data, total, message: "findAll" });
        } catch (error) {
            next(error);
        }
    };

    public getChannelsById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const findOneUserData: Channel = await this.channelService.findChannelById(userId);

            res.status(200).json({ data: findOneUserData, message: "findOne" });
        } catch (error) {
            next(error);
        }
    };

    public createChannel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: ChannelDto = req.body;
            const author = req.user.id;
            const createUserData: Channel = await this.channelService.createChannel({
                ...userData,
                author,
            });

            res.status(201).json({ data: createUserData, message: "created" });
        } catch (error) {
            next(error);
        }
    };

    public updateChannel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ChannelId: string = req.params.id;
            const userData: ChannelDto = req.body;
            const updateUserData: Channel = await this.channelService.updateChannel(
                ChannelId,
                userData,
            );

            res.status(200).json({ data: updateUserData, message: "updated" });
        } catch (error) {
            next(error);
        }
    };

    public deleteChannel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const deleteUserData: Channel = await this.channelService.deleteChannel(userId);

            res.status(200).json({ data: deleteUserData, message: "deleted" });
        } catch (error) {
            next(error);
        }
    };
}

export default ChannelsController;
