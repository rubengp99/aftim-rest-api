import { IGrupo } from "components/grupos/model";
import { ISubgrupo } from "components/subgrupos/model";

export interface IConcepto {
	id?: string | number | undefined;
	adm_empresa_id: string | number;
	codigo?: string | number;
	referencia?: string | number;
	nombre: string;
	descripcion?: string;
	talla?: string;
	color?: string;
	descuento?: number;
	serial_estatico?: number;
	serial_dinamico?: number;
	existencia_minima?: number;
	existencia_maxima?: number;
	adm_tipos_conceptos_id: number | string;
	adm_ubicacion_id?: number | string;
	costo?: number;
	ultimo_costo?: number;
	costo_mayor?: number;
	costo_promedio?: number;
	fecha_at: string;
	fecha_in?: string;
	fecha_uc?: string;
	adm_grupos_id?: number | string;
	adm_subgrupos_id?: number | string;
	presentacion?: number;
	adm_unidades_id?: number | string;
	fecha_hora?: number;
	adm_marcas_id?: number | string;
	estado?: boolean | number;
	pvp?: number;
	precio_a: number;
	precio_b?: number;
	precio_dolar: number;
	utilidad?: number;
	utilidad_a?: number;
	utilidad_b?: number;
	utilidad_c?: number;
	utilidad_dolar?: number;
	costo_dolar: number;
	precio_variable?: number;
	retiene?: boolean | number;
	farm_principio_activo_id?: number | string;
	imagen?: string;
	costo_adicional?: number;
	costo_adicional2?: number;
	cant_ensamblado?: number;
	licor?: boolean | number;
	porcentaje?: number;
	visible_pv?: boolean | number;
	visible_web?: boolean | number;
	rest_areas_id?: number | string;
	setcortesia?: boolean | number;
	exento?: boolean | number;
	merma?: boolean | number;
	existencia_c?: number;
	obviar_ajuste?: boolean | number;
	iva?: boolean | number;
	presentaciones?: any[];
	existencias?: any[];
	grupo?: IGrupo;
	subgrupo?: ISubgrupo;
	isSold?: Boolean;
	direcciones?: IDirecciones,
}

export interface IDirecciones {
	municipio: 	string,
	estado: 	string,
}

export interface IPresentaciones {}
