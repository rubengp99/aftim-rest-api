export interface IMovimientoInventario {
    id?:string | number,
    conceptos_id:string | number,
    fecha_at?:string,
    depositos_id?:string | number,
    tipo?:string,
    origen?:string,
    documento?:number,
    tercero?:number,
    cantidad:number,
    costo:number,
    costo_dolar:number,
    venta:number
}