export interface IDescargo {
    id?:string | number,
    fecha_at:string,
    descripcion:string,
    tipo_descargo_id: string | number,
    responsable: string | number,
    autorizador: string | number,
    detalles:IDetDescargo[]
}

export interface IDetDescargo {
    id?:string | number,
    enc_descargos_id:string | number,
    conceptos_id:string | number,
    depositos_id:string | number,
    existencia: number,
    descargo: number
}