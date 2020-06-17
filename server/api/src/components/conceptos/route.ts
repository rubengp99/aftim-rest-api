import * as controller from "./controller";
import { validar } from "../../helpers/aunthentication";
import { InternalServerError } from "../../errors";
import { Router, Request, Response } from "express";
const router = Router();

//obtener todos los conceptos
router.get("/", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.get(req.query, tenantId);
			return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener todos los conceptos ordenados por ventas
router.get("/mostsold", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.getMostSold(req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener todos los conceptos ordenados por devoluciones
router.get("/mostreturned", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.getMostReturned(req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener ventas de un concepto
router.get("/:id/sell", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.sellByConcept(req.params, req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener devoluciones de un concepto
router.get("/:id/devolutions", validar, async (req: Request, res: Response): Promise<Response> => {	
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.devolutionsByConcept(req.params, req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//para saber si el concepto ha sido vendido alguna vez
router.get("/:id/issold", validar, async (req: Request, res: Response): Promise<Response> => {
	let { id } = req.params;
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.isSold(id, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener un concepto en concreto
router.get("/:id", validar, async (req: Request, res: Response): Promise<Response> => {
	let { id } = req.params;
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.getOne(id, req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener los depositos de un concepto
router.get("/:id/depositos", validar, async (req: Request, res: Response): Promise<Response> => {
	let { id } = req.params;
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.getDepositsByConcept(id, req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener informacion de la imagen asignada al concepto
router.get("/:id/photos", validar, async (req: Request, res: Response): Promise<Response> => {
	let { id } = req.params;
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.getPhotosByConcept(id, req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener las presentaciones de un concepto
router.get("/:id/presentaciones", validar, async (req: Request, res: Response): Promise<Response> => {
	let { id } = req.params;
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.getPresentationsByConcept(id, req.query, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//crear un concepto
router.post("/", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.create(req.body, req.file, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message + ' holi' });
	}
});

//actualizar un concepto
router.post("/:id", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, response, code } = await controller.update(req.params, req.body, req.file, tenantId);
		return res.status(code).json(message ? { message } : response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//eliminar un concepto
router.delete("/:id", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = req.headers['tenant-id'] as string;
		let { message, code } = await controller.remove(req.params, tenantId);
		return res.status(code).json({ message });
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

export default router;
