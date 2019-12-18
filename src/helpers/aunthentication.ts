import {Request,Response,NextFunction} from 'express';
import  * as encript from './encript';
import  * as users from './users';


export async function validar(req:Request,res:Response,next:NextFunction){
    let head:string = req.headers['x-access-control'] as string ;
    if(head){
        let {password,user} = JSON.parse(head);
        let masterUser = await users.getUser(user);
        if(masterUser){
            req.userId = masterUser.id;
            next();
            // if(encript.validar(password,masterUser.password)){
                
            // }else{
            //     return res.status(401).json({message:"No autorizado"});
            // }
        }else{
            return res.status(400).json({message: "Datos no validos 1"});
        }
    }else{
        return res.status(400).json({message: "Datos no validos 2"});
    }
    
}