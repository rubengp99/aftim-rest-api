import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();
//obtener todos los movimientos movimiento
router.get('/',validar,async (req:Request,res:Response):Promise<Response>=>{
    try {
        let {message,response,code}= await controller.get(req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});
//obtener un movimiento caja
router.get('/:id',validar,async (req:Request,res:Response):Promise<Response>=>{
    const {id} = req.params;
    const {query} = req.query;
    try {
        let {message,response,code}= await controller.getOne(id,query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear un movimiento
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.create(req.body,req.file);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

export default router