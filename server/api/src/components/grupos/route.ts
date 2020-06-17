import * as controller from './controller';
import { validar } from '../../helpers/aunthentication';
import { InternalServerError } from '../../errors';
import { Router, Request, Response } from 'express';
const router = Router();

//obtener todos los grupos
router.get('/', validar, async (req: Request, res: Response): Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.get(req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener todos los grupos ordenados por ventas
router.get('/mostsold', validar, async (req: Request, res: Response): Promise<Response> => {
    let { query } = req;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let {message,data,code} = await controller.mostSold(query, tenantId);
        return res.status(code).json(message ? {message} : {data});
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener un grupo en concreto
router.get('/:id', validar, async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.params;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getOne(id, req.query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener los subgrupos de un grupo en concreto
router.get('/:id/subgrupos/', validar, async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.params;
    let { query } = req;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getSubGruposByGrupo(id, query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener los conceptos de un grupo
router.get('/:id/conceptos/', validar, async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.params;
    let { query } = req;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getConceptosByGrupo(id, query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener las ventas de un grupo
router.get('/:id/sell', validar, async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.params;
    let { query } = req;
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.getSellByGroups(id, query, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//crear un grupo
router.post('/', validar, async (req: Request, res: Response): Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.create(req.body, req.file, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//editar un grupo
router.post('/:id', validar, async (req: Request, res: Response): Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, response, code } = await controller.update(req.params, req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//eliminar un grupo
router.delete('/:id', validar, async (req: Request, res: Response): Promise<Response> => {
    try {
        let tenantId: string = req.headers['tenant-id'] as string;
        let { message, code } = await controller.remove(req.params, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

export default router;