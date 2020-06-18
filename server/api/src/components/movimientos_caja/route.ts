import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
import { getTenantId } from '../../helpers/axios';

const router = Router();

//obtener todos los movimientos caja
router.get('/',validar,async (req:Request,res:Response):Promise<Response>=>{
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code}= await controller.get(req.query, tenantId);
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
        let tenantId: string = getTenantId(req);
        let {message,response,code}= await controller.getOne(id,query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear un movimiento
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.create(req.body,req.file, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

export default router