export interface IDescargo {
    id?:                string | number,
    fecha_at:           string,
    descripcion:        string,
    adm_tipo_descargo_id:   string | number,
    responsable:        string | number,
    autorizador:        string | number,
    detalles?:           IDetDescargo[]
}

export interface IDetDescargo {
    id?:                string | number,
    adm_enc_descargos_id:   string | number,
    adm_conceptos_id:       string | number,
    adm_depositos_id:       string | number,
    existencia:         number,
    descargo:           number
}