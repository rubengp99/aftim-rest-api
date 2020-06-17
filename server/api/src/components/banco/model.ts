export interface IBanco {
    id?:                    string | number,
    cuenta:                 string,
    fecha_at?:              string,
    adm_entidad_id:             string | number;
    fecha_apertura:         string,
    direccion:              string,
    telefono:               string,
    adm_tipo_cuenta_id:         string | number,
    agencia:                string,
    contacto:               string,
    telefono_contacto:      string,
    email_contacto:         string,
    dias_diferidos:         number,
    ult_saldo_conciliado:   number,
    saldo_actual:           number,
    fecha_ult_conciliacion: string,
    pto_venta:              number
}