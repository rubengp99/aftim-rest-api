import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener todos los clientes
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.get(req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener todos los clientes ordenados por compras
router.get('/mostbuyers',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.getMostBuyers(req.query);
        return res.status(code).json(message ? {message} : {response});
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener un cliente en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let { message, response, code } = await controller.getOne(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener las compras de un cliente
router.get('/:id/buys',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.getBuys(req.params,req.query);
        return res.status(code).json(message ? {message} : {response});
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener las devoluciones de un cliente
router.get('/:id/devolutions',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.getDevolutions(req.params,req.query);
        return res.status(code).json(message ? {message} : {response});
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear un cliente
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.create(req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//actualizar un cliente
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.update(req.params,req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,code} = await controller.remove(req.params);
        return res.status(code).json(message);
    } catch (error) {
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

export default router;
