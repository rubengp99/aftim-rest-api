import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import  { Router,Request,Response } from 'express';
const router = Router();

router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let data:any = await controller.get(req.query);
        if(data.message){
            return res.status(204).json(data);
        }else{
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let data:any = await controller.getOne(id,req.query);
        if(data.message){
            return res.status(404).json(data);
        }else{
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.get('/:id/conceptos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let data:any = await controller.getConceptsByEmpresa(id,req.query);
        if(data.message){
            return res.status(404).json(data);
        }else{
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});
router.get('/:id/depositos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let data:any = await controller.getDepositsByEmpresa(id,req.query);
        if(data.message){
            return res.status(404).json(data);
        }else{
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.get('/:id/grupos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let data:any = await controller.getGroupsByEmpresa(id,req.query);
        if(data.message){
            return res.status(404).json(data);
        }else{
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.get('/:id/subgrupos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let data:any = await controller.getSubgroupsByEmpresa(id,req.query);
        if(data.message){
            return res.status(404).json(data);
        }else{
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});
  
router.post('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {response,code} = await controller.create(req.body);
        return res.status(code).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {response,code} = await controller.update(req.params,req.body);
        return res.status(code).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {response,code} = await controller.remove(req.params);
        return res.status(code).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

export default router;