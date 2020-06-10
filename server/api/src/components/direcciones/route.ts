import * as controller from "./controller";
import { validar } from "../../helpers/aunthentication";
import { InternalServerError } from "../../errors";
import { Router, Request, Response } from "express";
const router = Router();

//obtener todos los estados
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

//obtener un estado en concreto
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


//crear un estado
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

//actualizar un estado
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

//eliminar un estado
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

//agregar municipios a un estado
router.post(
	"/:id/municipios/",
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

//actualizar un municipio en concreto de un estado
router.post(
	"/:id/municipios/:id1",
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

//eliminar un municipio de un estado
router.delete(
	"/:id/municipios/:id1",
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
