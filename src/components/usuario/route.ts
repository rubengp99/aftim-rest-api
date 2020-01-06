import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response, response } from 'express';
const router = Router();

router.post('/login',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {code,response,message,token} = await controller.login(req.body);
         return res.status(code).json(message || {response,token});
        
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.post('/signup',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {code,response,message,token}= await controller.signUp(req.body);
        return res.status(code).json(message || {response,token});
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.post('/validate',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { code, response, message } = await controller.validarToken(req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.get('/:id/pedidos',validar, async(req:Request, res:Response): Promise<Response> =>{
    let {id} = req.params;
    let {query} = req;
    try {
        let { code, response, message } = await controller.getPedidosByUser(id,query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});



export default router;