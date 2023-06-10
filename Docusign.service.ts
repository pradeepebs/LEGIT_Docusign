import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import session from "express-session";
import docusign from "docusign-esign";

const app = express();
//const docusign=require("docusign-esign");

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:"lkjhgf",
    resave:true,
    saveUninitialized:true
}));
  
export default class DocuSignService {

    static async createDocusignToken(request:any){ 
try {
    console.log("generating new access token");
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH || '');
    
    const integrationKey = process.env.INTEGRATION_KEY;
    const userId = process.env.USER_ID;
  
    if (integrationKey && userId) {
      const results = await dsApiClient.requestJWTUserToken(
        integrationKey,
        userId,
        ["signature"],
        fs.readFileSync(path.join(__dirname, "private.key")),
        3600
      );
      console.log(results.body);
      request.session.access_token = results.body.access_token;
      request.session.expires_at = Date.now() + (results.body.expires_in - 60) * 1000;
    } else {
      console.error('Integration key or user ID is not defined');
    }
  } catch (error) {
    return error;
  }
     }  





    static async getDocusignToken(request:any){ 
        try{
            if(request.session.access_token && Date.now()< request.session.expires_at){
                console.log("reusing access_token  ",request.session.access_token)
            }
             else {   
        console.log(" regenerating new access token");
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH || '');
    
    const integrationKey = process.env.INTEGRATION_KEY;
    const userId = process.env.USER_ID;
  
    if (integrationKey && userId) {
      const results = await dsApiClient.requestJWTUserToken(
        integrationKey,
        userId,
        ["signature"],
        fs.readFileSync(path.join(__dirname, "private.key")),
        3600
      );
      console.log(results.body);
      request.session.access_token = results.body.access_token;
      request.session.expires_at = Date.now() + (results.body.expires_in - 60) * 1000;
    } else {
      console.error('Integration key or user ID is not defined');
    }
        } }
        catch (error) {
            return error;
        }
        
    }



}
