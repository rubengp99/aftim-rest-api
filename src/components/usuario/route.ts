import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import  { Router,Request,Response } from 'express';
const router = Router();

router.post('/login',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {code,data,message,token} = await controller.login(req.body);
        if(message) return res.status(code).json(message);
        return res.status(code).header('user_token',token).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.post('/signup',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {code,data,message,token}= await controller.signUp(req.body);
        if(message){
            return res.status(code).json(message);
        }else{
            return res.status(code).header('user_token',token).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.get('/validate',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { code, data, message } = await controller.validarToken(req.headers);
        if(message){
            return res.status(code).json(message);
        }else{
            return res.status(code).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});



export default router;