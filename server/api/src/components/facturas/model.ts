export interface IFacturas{
    id?:                    string | number,
    numero_factura:         string,
    numero_fiscal?:         string,
    serial_impresora?:      string,
    fecha_at?:              string,
    fecha_in?:              string,
    adm_vendedor_id?:           string | number,
    adm_clientes_id?:           string | number,
    subtotal:               number,
    subtotal_dolar:         number,
    iva?:                   number,
    facturado:              boolean | number,
    estatus_pago:           number,
    abono:                  number,
    abono_dolar:            number,
    adm_tipos_facturas_id:      string | number,
    adm_usuarios_id:            string | number,
    adm_caja_id:                string | number,
    observacion?:           string,
    adm_enc_presupuesto_id?:    string | number,
    anulada?:               boolean | number,
    usuario_modificador:    string,
    devuelto?:              number,
    motivoreimpresion?:     string,
    afecta_factura?:        string,
    rest_pedidos_id:        string | number,
    fecha_hora:             string,
    coo?:                   string,
    estatus_entrega?:       number,
    fecha_entrega?:         string,
    detalles?:              IDetFacturas[]
} 


export interface IDetFacturas {
    id?:                string | number,
    adm_enc_facturas_id:    string | number,
    adm_conceptos_id:       string | number,
    adm_vendedor_id:        string | number,
    costo:              number,
    costo_dolar:        number,
    precio:             number,
    precio_dolar:       number,
    descuentopro:      number,
    fecha_at?:          string,
    cantidad:           number,
    despachado:         number,
    devuelto:           boolean | number,
    adm_seriales_id?:       string | number,
    monto_documento:    number,
    adm_lotes_id?:          string | number
}