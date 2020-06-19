export interface IEnsamblado {
    id?:                        string | number,
    fecha_at:                   string,
    fecha_in:                   string,
    conceptos_id:               string |number,
    tipo_estatus_ensamblado_id: string | number,
    cantidad_plant:             number,
    total_proporciones:         number,
    total_costos:               number,
    total_gastos:               number,
    otros:                      number,
    total:                      number,
    detalle:                    string,
    usuario_id:                 string | number,
    detalles:                   any[]
}