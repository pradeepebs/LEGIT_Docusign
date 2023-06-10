import { Request, Response } from "express";
import ResponseError from "../helper/APIResponse/ResponseError";
import ResponseSuccess from "../helper/APIResponse/ResponseSuccess";
import DocuSignService from "../services/Docusign.service";

export default class DocusignController {
  
    static async createDocusignToken (req: Request, res: Response)
{
      try {
        const user: any = await DocuSignService.createDocusignToken(req.body);
        if (user instanceof Error) {
            return ResponseError(res, user, 400)
        }
        return ResponseSuccess(res, 200, user);
    } catch(error: any){
        return ResponseError(res, (error.parent && error.parent.sqlMessage) || error.message, 200)
    }
}

static async getDocusignToken (req: Request, res: Response)
{
      try {
        const user: any = await DocuSignService.getDocusignToken(req.body);
        if (user instanceof Error) {
            return ResponseError(res, user, 400)
        }
        return ResponseSuccess(res, 200, user);
    } catch(error: any){
        return ResponseError(res, (error.parent && error.parent.sqlMessage) || error.message, 200)
    }
}


}
