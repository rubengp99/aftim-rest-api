import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.get(req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.get('/mostbuyers',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.getMostBuyers(req.query);
        return res.status(code).json(message ? {message} : {response});
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let { message, response, code } = await controller.getOne(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.get('/:id/buys',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.getBuys(req.params,req.query);
        return res.status(code).json(message ? {message} : {response});
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.get('/:id/devolutions',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.getDevolutions(req.params,req.query);
        return res.status(code).json(message ? {message} : {response});
    } catch (error) {
        console.log(error);
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});


router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.create(req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.update(req.params,req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,code} = await controller.remove(req.params);
        return res.status(code).json(message);
    } catch (error) {
        return res
                .status(InternalServerError.code)
                .json({message:InternalServerError.message});
    }
});

export default router;
