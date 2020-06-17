import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import  { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener todas las unidades
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message,response,code} = await controller.get(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});
//obtener una unidad
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message, response, code} = await controller.getOne(id,req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear una unidad
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message,response,code} = await controller.create(req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});
//editar una unidad
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message,response,code} = await controller.update(req.params,req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});
//eliminar una unidad
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message,code} = await controller.remove(req, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});



export default router;