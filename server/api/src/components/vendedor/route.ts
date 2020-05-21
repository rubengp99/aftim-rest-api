import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener todos los vendedores
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.get(req.query);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener todos los vendedores ordenados por ventas
router.get('/mostsellers',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.getTopSellers(req.query);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener un vendedor en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getOne(id,req.query);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener las ventas de un vendedor
router.get('/:id/sell',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.getSellsBySeller(req.params,req.query);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//crear un vendedor
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.create(req.body);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//actualizar un vendedor
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.update(req.params,req.body);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//eliminar un vendedor
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,code} = await controller.remove(req.params);
        return res.status(code).json({message});
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

export default router;