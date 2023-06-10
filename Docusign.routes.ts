import { Router } from 'express';
import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import DocusignController from '../controllers/Docusign.controller';

  
const docuSign_route = Router();


docuSign_route.post('/createDocusignToken',DocusignController.createDocusignToken);

docuSign_route.get('/getDocusignToken',DocusignController.getDocusignToken);


export default docuSign_route;

//
// function checkToken(request: Request<{}, any, any, ParsedQs, Record<string, any>>) {
//     throw new Error('Function not implemented.');
// }
