export interface IDescargo {
    id?:string | number,
    fecha_at:string,
    descripcion:string,
    tipo_descargo_id: string | number,
    responsable: string | number,
    autorizador: string | number,
    detalles:any[]
}