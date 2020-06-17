import * as controller  from './controller';
import  {validar}  from'../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import  { Router,Request,Response } from 'express';
const router = Router();

//obtener conceptos
router.get('/conceptos',validar,async (req:Request,res:Response):Promise<Response>=>{
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message,response,code} = await controller.getTiposConceptos(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.code});
    }
});

//obtene un concepto
router.get('/conceptos/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = req.headers['tenantId'] as string;
        let {message,response,code} = await controller.getOneTipoConcepto(id,req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({message:InternalServerError.code});
    }
});



export default router;
