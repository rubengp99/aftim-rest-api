import * as controller from "./controller";
import { validar } from "../../helpers/aunthentication";
import { InternalServerError } from "../../errors";
import { Router, Request, Response } from "express";
const router = Router();

//obtener todos los pedidos
router.get(
	"/",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.get(req.query);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);
router.get(
	"/stats",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.getStats();
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//obtener un pedido en concreto
router.get(
	"/:id",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		let { id } = req.params;
		try {
			let { message, response, code } = await controller.getOne(id, req.query);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//obtener los conceptos de un pedido
router.get(
	"/:id/conceptos/",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.getConceptsByOrder(req.params, req.query);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//obtener la informacion de banco de un pedido
router.get(
	"/:id/movimiento_banco/",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.getBankMovesByOrder(req.params, req.query);
			return res.status(code).json(message ? { message } : { response });
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//crear un pedido
router.post(
	"/",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.create(req.body, req.file);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//actualizar un pedido
router.post(
	"/:id",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.update(req.params, req.body);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//eliminar un pedido
router.delete(
	"/:id",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, code } = await controller.remove(req.params);
			return res.status(code).json(message);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//actualizar los detalles de un pedido
router.post(
	"/:id/detalles/",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, response, code } = await controller.addDetail(req.params, req.body);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//actualizar un detalle en concreto de un pedido
router.post(
	"/:id/detalles/:id1",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { response, message, code } = await controller.updateDetail(req.params, req.body);
			return res.status(code).json(message || response);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

//eliminar un pedido
router.delete(
	"/:id/detalles/:id1",
	validar,
	async (req: Request, res: Response): Promise<Response> => {
		try {
			let { message, code } = await controller.deleteDetail(req.params);
			return res.status(code).json(message);
		} catch (error) {
			console.log(error);
			return res.status(InternalServerError.code).json({ message: InternalServerError.message });
		}
	}
);

export default router;
