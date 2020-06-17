import * as consult from "../../helpers/consult";
import * as links from "../../helpers/links";
import * as respuestas from "../../errors";
import { IEstados, IMunicipios } from "./model";

const model = "adm_estado";
const submodel = "adm_municipios";

/**
 * Get all states
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
	try {
		let data: IEstados[] = await consult.get(tenantId, model, query);
		let totalCount: number = await consult.count(tenantId, model);
		let count = data.length;
		let { limit } = query;

		if (count <= 0) return respuestas.Empty;

		for (let i = 0; i < data.length; i++) {
			let { id } = data[i];
			let pres: IMunicipios[] = await consult.get(tenantId, submodel, { estado_id: id });
			data[i].detalles = pres;
		}
		let link = links.pages(data, model, count, totalCount, limit);
		let response = Object.assign({ totalCount, count, data }, link);

		return { response, code: respuestas.Ok.code };
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};

/**
 * Get one state
 * @param id id of the state
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
	try {
		if (isNaN(id as number)) return respuestas.InvalidID;

		let data: IEstados = await consult.getOne(tenantId, model, id, query);

		if (!data) return respuestas.ElementNotFound;

		let pres: IMunicipios[] = await consult.get(tenantId, submodel, { estado_id: id });
		data.detalles = pres;

		let response = Object.assign({ data });

		return { response, code: respuestas.Ok.code };
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};

/**
 * Create a new state
 * @param body data of the new state
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
	let { data, data1 } = body;

	let newEstado: IEstados = typeof data == "string" ? JSON.parse(data) : data;

	var newMunicipios: IMunicipios[]

	try {
		let { insertId } = await consult.create(tenantId, model, newEstado);

		if (typeof data1 !== "undefined") {
			newMunicipios = typeof data1 == "string" ? JSON.parse(data1) : data1;
			for (let index = 0; index < newMunicipios.length; index++) {
				newMunicipios[index].estado_id = insertId;
				let inserted = await consult.create(tenantId, submodel, newMunicipios[index]);
				newMunicipios[index].id = inserted.insertId;
			}
			newEstado.detalles = newMunicipios;
		}
		let link = links.created(model, insertId);

		newEstado.id = insertId;
		let response = Object.assign({ data: newEstado, message: respuestas.Created.message }, { link: link });

		return { response, code: respuestas.Created.code };
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};

export async function update(params: any, body: any, tenantId: string): Promise<any> {
	let { id } = params;
	let { data } = body;
	let newEstado: IEstados = data;
	try {
		if (isNaN(id)) return respuestas.InvalidID;

		let { affectedRows } = (await consult.update(tenantId, model, id, newEstado)) as any;
		let link = links.created(model, id);
		let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });

		return { response, code: respuestas.Update.code };
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
}

/**
 * Delete a state 
 * @param params params request object
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
	let { id } = params;
	try {
		if (isNaN(id)) return respuestas.InvalidID;

		const data: IEstados = await consult.getOne(tenantId, model, id, { fields: "id" });

		if (!data) return respuestas.ElementNotFound;

		const data1: IMunicipios[] = await consult.get(tenantId, submodel, { estado_id: id });

		for (let index = 0; index < data1.length; index++) {
			await consult.remove(tenantId, submodel, data1[index].id as number);
		}

		await consult.remove(tenantId, model, id);

		return respuestas.Deleted;
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};

/**
 * Add a detail to the state
 * @param params paramas request object
 * @param body data of the municipality
 */
export const addDetail = async (params: any, body: any, tenantId: string): Promise<any> => {
	let { data } = body;
	let { id } = params;

	if (isNaN(id)) return respuestas.InvalidID;

	try {
		console.log(id)
		const estado = await consult.getOne(tenantId, model, id, { fields: "id" });

		if (!estado) return respuestas.ElementNotFound;

		const newMunicipio: IMunicipios = data;
		newMunicipio.estado_id = +id;
		console.log(newMunicipio)
		const { insertId } = await consult.create(tenantId, submodel, newMunicipio);

		newMunicipio.id = insertId;

		const link = links.created(model, insertId);
		const response = { data: newMunicipio, message: respuestas.Created.message, link: link };

		return { response, code: respuestas.Created.code };
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};

/**
 * Modify one municipality of an state
 * @param params params request object
 * @param body data of the municipality
 */
export const updateDetail = async (params: any, body: any, tenantId: string): Promise<any> => {
	let { data } = body;
	let { id, id1 } = params;
	if (isNaN(id) || isNaN(id1)) return respuestas.InvalidID;
	try {
		const estado = await consult.getOne(tenantId, model, id, { fields: "id" });

		if (!estado) return respuestas.ElementNotFound;

		const detalle = await consult.getOne(tenantId, submodel, id1, {});

		if (!detalle) return respuestas.ElementNotFound;

		const newMunicipio: IMunicipios = data;

		await consult.update(tenantId, submodel, id1, newMunicipio);

		const link = links.created(model, id);
		const response = { message: respuestas.Update.message, link: link };

		return { response, code: respuestas.Update.code };
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};

/**
 * Remove a municipality from the state
 * @param params params request object
 */
export const deleteDetail = async (params: any, tenantId: string): Promise<any> => {
	let { id, id1 } = params;

	if (isNaN(id) || isNaN(id1)) return respuestas.InvalidID;

	try {
		const estado = await consult.getOne(tenantId, model, id, { fields: "id" });

		if (!estado) return respuestas.ElementNotFound;

		await consult.remove(tenantId, submodel, id1);

		return respuestas.Deleted;
	} catch (error) {
		if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
		console.log(`Error al consultar la base de datos, error: ${error}`);
		return respuestas.InternalServerError;
	}
};