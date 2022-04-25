import { NextFunction, Request, Response } from "express";
import { View } from "@/interfaces/docs.interface";
import BadsService from "@/services/bads.service";

class BadsController {
    public badsService = new BadsService();

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const from: string = req.params.id;
            const data: View[] = await this.badsService.findAll(from);
            const total: number = await this.badsService.total(from);

            res.status(200).json({
                data,
                total,
                message: "ok",
            });
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const from: string = req.params.id;
            const author = req.user?.id;
            const data: View = await this.badsService.create({ from, author });

            res.status(200).json({
                data,
                message: "ok",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}

export default BadsController;
