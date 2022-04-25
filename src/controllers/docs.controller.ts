import { today } from "./../utils/util";
import { NextFunction, Request, Response } from "express";
import { Doc } from "@/interfaces/docs.interface";
import DocService from "@/services/doc.service";
import { DocDto } from "@dtos/users.dto";

class DocsController {
    public docService = new DocService();

    public getDocs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: Doc[] = await this.docService.findAllDoc(req);
            const total: number = await this.docService.listTotal();
            res.status(200).json({ data: data, total, message: "findAll" });
        } catch (error) {
            next(error);
        }
    };

    public getDocsById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const findOneUserData: Doc = await this.docService.findDocById(userId);

            res.status(200).json({ data: findOneUserData, message: "findOne" });
        } catch (error) {
            next(error);
        }
    };

    public createDoc = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: DocDto = req.body;
            const author = req.user.id;
            const createUserData: Doc = await this.docService.createDoc({ ...userData, author });

            res.status(201).json({ data: createUserData, message: "created" });
        } catch (error) {
            next(error);
        }
    };

    public updateDoc = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const DocId: string = req.params.id;
            const userData: DocDto = req.body;
            const updateUserData: Doc = await this.docService.updateDoc(DocId, userData);

            res.status(200).json({ data: updateUserData, message: "updated" });
        } catch (error) {
            next(error);
        }
    };

    public deleteDoc = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const deleteUserData: Doc = await this.docService.deleteDoc(userId);

            res.status(200).json({ data: deleteUserData, message: "deleted" });
        } catch (error) {
            next(error);
        }
    };
}

export default DocsController;
