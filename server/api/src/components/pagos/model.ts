export interface IPago{
    id?:                string | number,
    emisor:             string,
    receptor:           string,
    adm_pedidos_id:     number,
    adm_tipo_pago_id:   number,
    adm_status_id:      number,
    monto:              number,
    codigo_referencia:  number,
    imagen:             string,
    adm_clientes_id:    number,
}
