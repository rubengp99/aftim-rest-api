import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener todas las facturas
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.get(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener los ingresos facturas
router.get('/total',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getTotal(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener el total de facturas existentes
router.get('/cantidad',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getCantidad(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener una factura en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getOne(id,req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//crear una factura
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,response,code} = await controller.create(req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//actualizar una factura
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

//eliminar una factura
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,code} = await controller.remove(req.params, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//actualizar los detalles de una factura
router.post('/:id/detalles/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,response,code} = await controller.addDetail(req.params,req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//actualizar un detalle en concreto en una factura
router.post('/:id/detalles/:id1',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {response,message,code} = await controller.updateDetail(req.params,req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//eliminar un detalle de una factura en concreto
router.delete('/:id/detalles/:id1',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,code} = await controller.deleteDetail(req.params, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

export default router;