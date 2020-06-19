import * as controller from './controller';
import { validar } from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import { Router, Request, Response } from 'express';
import { getTenantId } from '../../helpers/axios';

const router = Router();

//obtener todas las ciudades
router.get('/', validar, async (req: Request, res: Response): Promise<Response> => {
    try {
        let holi = "";
        let tenantId: string = getTenantId(req);
        let { message, response, code } = await controller.get(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener una ciudad en concreto
router.get('/:id', validar, async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.params;
    try {
        let tenantId: string = getTenantId(req);
        let { message, response, code } = await controller.getOne(id, req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//crear un registro de ciudad
router.post('/', validar, async (req: Request, res: Response): Promise<Response> => {
    try {
        let tenantId: string = getTenantId(req);
        let { message, response, code } = await controller.create(req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

export default router;