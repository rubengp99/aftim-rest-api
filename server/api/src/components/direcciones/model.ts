export interface IEstados
{
    id?:                    string | number,
    estado?:                string,
    detalles?:              IMunicipios[]
}

export interface IMunicipios {
    id?:                string | number,
    municipio?:         string,
    estado_id?:         string | number,
}