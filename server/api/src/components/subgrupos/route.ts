import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
import { getTenantId } from '../../helpers/axios';

const router = Router();

//obtener un subgrupo
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

//obtener todos los subgrupos ordenados por ventas
router.get('/mostsold', validar, async (req: Request, res: Response): Promise<Response> => {
    let { query } = req;
    try {
        let tenantId: string = getTenantId(req);
        let {message,data,code} = await controller.mostSold(query, tenantId);
        return res.status(code).json(message ? {message} : {data});
    } catch (error) {
        console.log(error);
        return res
            .status(InternalServerError.code)
            .json({ message: InternalServerError.message });
    }
});

//obtener un subgrupo en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.getOne(id,req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los conceptos de un subgrupo en especifico
router.get('/:id/conceptos/',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    let {query} = req;
    try {
        let tenantId: string = getTenantId(req);
        let {response,code} = await controller.getConceptosBySubgrupo(id,query, tenantId);     
        return res.status(code).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

//obtener las ventas de un subgrupo
router.get('/:id/sell',validar, async (req:Request, res:Response): Promise<Response> =>{
    let { id } = req.params;
    let { query } = req;
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.getSellBySubgroups(id,query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear un subgrupo
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

//actualizar un subgrupo
router.post('/:id', validar, async (req:Request, res:Response):Promise<Response> =>{
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.update(req.params,req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//eliminar un subgrupo
router.delete('/:id', validar, async (req:Request, res:Response):Promise<Response> =>{
    try {
        let tenantId: string = getTenantId(req);
        let {message,code} = await controller.remove(req.params, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});


export default router;
