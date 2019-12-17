import * as controller  from './controller';
import  {validar}  from '../../helpers/aunthentication';
import  { Router,Request,Response } from 'express';
const router = Router();
//obtener todos los conceptos
router.get('/',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let data:any = await controller.get(req);
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
router.get('/:id/depositos',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let data:any = await controller.getDepositsByConcept(id,req.query);
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
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {response,code} = await controller.update(req);
        return res.status(code).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});
//eliminar una grupo
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {response,code} = await controller.remove(req);
        return res.status(code).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

export default router;