import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener todas las empresas
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.get(req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener una empresa en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getOne(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los conceptos de una empresa
router.get('/:id/conceptos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getConceptsByEmpresa(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los depositos de una empresa
router.get('/:id/depositos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getDepositsByEmpresa(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los grupos de una empresa
router.get('/:id/grupos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getGroupsByEmpresa(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los cargos de una empresa
router.get('/:id/cargos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getCargosByEmpresa(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los conceptos de un grupo de una empresa
router.get('/:eId/grupos/:gId/conceptos',validar, async (req:Request, res:Response):Promise<Response> => {
    let { eId, gId } = req.params;
    try {
        let {message,response,code} = await controller.getConceptsByGroupByEmpresa(eId,gId,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los subgrupos de una empresa
router.get('/:id/subgrupos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getSubgroupsByEmpresa(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los pedidos de una empresa
router.get('/:id/pedidos',validar, async(req:Request, res:Response): Promise<Response> =>{
    let {id} = req.params;
    let {query} = req;
    try {
        let { code, response, message } = await controller.getPedidosByEmpresa(id,query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//obtener los usuarios de una compañia
router.get('/:id/usuario',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.getUserByCompany(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear una empresa
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.create(req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//actualizar una empresa
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,response,code} = await controller.update(req.params,req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//ajustar el precio de todos los conceptos de una empresa
router.post('/:id/adjustPrice',validar, async (req:Request, res:Response):Promise<Response> => {
    let { id } = req.params;
    try {
        let {message,response,code} = await controller.adjustPrice(id, req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//crear un cargo en una empresa
router.post('/:id/cargos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let {message,response,code} = await controller.createCargo(id, req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

//eliminar una empresa
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {message,code} = await controller.remove(req.params);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.message});
    }
});

export default router;