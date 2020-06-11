export interface IEstados
{
    id?:                    number,
    estado?:                string,
    detalles?:              IMunicipios[]
}

export interface IMunicipios {
    id?:                number,
    municipio?:         string,
    estado_id?:         number,
}