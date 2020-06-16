export interface ICambio {
    id?:        string | number,
    tasa:       number,
    moneda:     string,
    adm_empresa_id:  number | boolean
}