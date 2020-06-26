import * as consult from "../../../helpers/consult";
import { IConcepto } from "../model";
import { IEmpresa } from "../../empresa/model";

const model = "adm_conceptos";
const submodel = "adm_presentaciones";

async function getPresentaciones(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {
    let { id } = data;
    if (fields && fields.includes("presentaciones")) {
        let pres: any[] = await consult.getOtherByMe(tenantId, model, id as string, submodel, {});
        data.presentaciones = pres;
        return data;
    }
    return data;
}
async function getDirecciones(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {
    try{
        let { adm_empresa_id } = data;
        if (fields && fields.includes("direcciones")) {
            let empresa: IEmpresa = await consult.getOne(tenantId, "adm_empresa" , adm_empresa_id as string,{ fields: "id, municipio_id, estado_id" });
            console.log(empresa)
            let estado: any = await consult.getOne(tenantId, 'adm_estado', empresa.estado_id, { fields:"nombre"});
            let municipio: any = await consult.getOne(tenantId, 'adm_municipios', empresa.municipio_id, {fields : "municipio" });
            data.direcciones = Object.assign({}, {
                estado: estado.nombre,
                municipio: municipio.municipio
            })
            return data;
        }

        return data;
    }catch(e){
        return data;
    }
}

async function getExistencias(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {
    let { id } = data;
    if (!fields || fields.includes("existencias")) {
        let movDep: any[] = await consult.getOtherByMe(tenantId, model, id as string, "adm_movimiento_deposito", { fields: "id,adm_depositos_id,existencia" });
        data.existencias = movDep;
        return data;
    }
    return data;
}

async function getGrupo(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {
    try {
        let { adm_grupos_id } = data;
        if (fields && fields.includes("grupo")) {
            data.grupo = await consult.getOne(tenantId, "adm_grupos", adm_grupos_id as string, { fields: "*" });
            return data;
        }
        return data;
    } catch (error) {
        return data;
    }
}

async function getSubGrupo(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {
    try {
        let { adm_subgrupos_id } = data;
        if (fields && fields.includes("subgrupo")) {
            data.subgrupo = await consult.getOne(tenantId, "adm_subgrupos", adm_subgrupos_id as string, { fields: "*" });
            return data;
        }
        return data;
    } catch (error) {
        return data;
    }
}

async function getIsSold(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {
    try {
        let { id } = data;
        if (fields && fields.includes("issold")) {
            let c = await consult.countOther(tenantId, model, "adm_det_facturas", id as string);
            data.isSold = c > 0;
            return data;
        }

        return data;
    } catch (error) {
        return data;
    }
}

export async function getOptionals(tenantId: string, fields: any, data: IConcepto) : Promise<IConcepto> {

    data = await getExistencias(tenantId, fields, data);
	data = await getSubGrupo(tenantId, fields, data);
	data = await getGrupo(tenantId, fields, data);
	data = await getDirecciones(tenantId, fields, data);
	data = await getPresentaciones(tenantId, fields, data);
    data = await getIsSold(tenantId, fields, data);
    
    return data;
}

