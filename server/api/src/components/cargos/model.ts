export interface ICargo {
    id?:string | number,
    fecha_at: string,
    fecha_in: string,
    conceptos_id:string | number,
    depositos_id:string | number,
    usuarios_id: string | number
}