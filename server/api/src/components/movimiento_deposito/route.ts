import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener todos los mov deposito
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,response,code} = await controller.get(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener un mov deposito en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,response,code} = await controller.getOne(id,req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear un mov deposito
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,response,code} = await controller.create(req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//editar una mov deposito
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,response,code} = await controller.update(req.params,req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//eliminar una mov deposito
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,code} = await controller.remove(req, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});



export default router;