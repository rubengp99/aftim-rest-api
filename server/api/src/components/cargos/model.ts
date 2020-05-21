export interface ICargo {
    id?:                string | number,
    fecha_at:           string,
    fecha_in:           string,
    adm_conceptos_id:   string | number,
    cantidad:           string | number,
    adm_depositos_id:   string | number,
    usuarios_id:        string | number,
    adm_empresa_id:     string | number
}