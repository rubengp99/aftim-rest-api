import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import  { Router,Request,Response } from 'express';
const router = Router();
//obtener todos los grupos
router.get('/',validar, async (req:Request, res:Response) => {
    try {
        let data:any = await controller.get(req);
        if(data.message){
            res.status(204).json(data);
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});
//obtener una grupo
router.get('/:id', async (req:Request, res:Response) => {
    let {id} = req.params;
    try {
        let data:any = await controller.getOne(id,req.query);
        if(data.message){
            res.status(404).json(data);
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});
router.get('/:id/subgrupos/', async (req:Request, res:Response) => {
    let {id} = req.params;
    let {query} = req;
    try {
        let {response,code} = await controller.getSubGruposByGrupo(id,query);     
        res.status(code).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});
router.get('/:id/conceptos/', async (req:Request, res:Response) => {
    let {id} = req.params;
    let {query} = req;
    try {
        let {response,code} = await controller.getConceptosByGrupo(id,query);
        res.status(code).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});
//crear una grupo
router.post('/', async (req:Request, res:Response) => {
    try {
        let {response,code} = await controller.create(req);
        res.status(code).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});
//editar una grupo
router.post('/:id', async (req:Request, res:Response) => {
    try {
        let {response,code} = await controller.update(req);
        res.status(code).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});
//eliminar una grupo
router.delete('/:id', async (req:Request, res:Response) => {
    try {
        let {response,code} = await controller.remove(req);
        res.status(code).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error interno"});
    }
});



export default router;