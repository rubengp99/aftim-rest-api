/** 
 * Tipo de datos encargado de los pedidos hacia restaurant o el marketplace
* @type IPedidos
* @property  {string | number} id : the id of the order  
* @property  {string | number} mesas_id : the id of the point of consume 
* @property  {string | number} estatus_id: the status of the order 
* @property  {string | number} estado: status of the invoice 
* @property  {date} fecha_at: date of the order 
* @property  {date} fecha_in: date of the last update of the order
* @property  {string | number} usuario_id: user that make the order
* @property  {string | number} autorizo: id of the user that authorized the annulment of the order
* @property  {string} motivo: reason for the annulment
* @property  {string} observacion: any observation of the order
* @property  {string | number} clientes_id: id of the client 
* @property  {string | number} enc_facturas_id: id of the invoice
* @property  {IDetPedidos} detalles: details of the order, by concept
*/

export interface IPedidos 
{
    id?: string | number,
    mesas_id?:string | number,
    estatus_id:string | number,
    estado: string,
    cant_personas: number,
    fecha_at:string,
    fecha_in:string,
    usuario_id:string | number,
    autorizo?:string | number,
    motivo?:string,
    observacion?:string,
    clientes_id?:string | number,
    enc_factura_id?: string | number,
    detalles?:IDetPedidos[]
}

/** 
 * Detalles de los pedidos
* @type IDetPedidos
* @property  {string | number} id : the id of the order  
* @property  {string | number} pedidos_id : the id of the order enc 
* @property  {string | number} conceptos_id: the concept of the detail
* @property  {number} cantidad: how many units are of the concept 
* @property  {number} precio: base price of the concept
* @property  {date} fecha_at: date of the order 
* @property  {date} fecha_in: date of the last update of the order
* @property  {string | number} estatus_id: the status of the order
* @property  {string | number} estado: status of the invoice
* @property  {string} observacion: any observation of the order
* @property  {string | number} autorizo: id of the user that authorized the annulment of the order
* @property  {string} motivo: reason for the annulment
* @property  {boolean} impreso ~deprecated~
* @property  {boolean} entrada ~deprecated~
* @property  {string | number} motivo: user that add the detail
* @property  {boolean} cortesia: free
* @property  {string | number} motivo_anul_id: motive of the annulment
*/
export interface IDetPedidos {
    id?:string | number,
    pedidos_id:string | number,
    conceptos_id:string | number,
    cantidad:number,
    precio:number,
    fecha_at:string,
    fecha_in:string,
    estatus_id:string | number,
    estado: string,
    observacion?:string,
    areas_id?:string | number,
    autorizo?:string | number,
    motivo?:string,
    impreso?:number | boolean,
    entrada?:number | boolean,
    usuario_id?: string | number,
    cortesia?:number | boolean,
    motivo_anul_id?: string | number
}