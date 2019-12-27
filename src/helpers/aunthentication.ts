import {Request,Response,NextFunction} from 'express';
import  * as encript from './encript';
import  * as users from './consult';


export async function validar(req:Request,res:Response,next:NextFunction){
    console.log(`[DATE] ${new Date()}`);
    let head:string = req.headers['x-access-control'] as string ;
    if(head){
        let mamalo = JSON.parse(head);
        let masterUser = await users.getUser(mamalo.user);
        console.log(mamalo);
        console.log(head);
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