export interface IObjetivo{
    id?:        string | number,
    fecha_at:   string,
    tipo:       string,
    resposable: number,
    meta:       number|string,
    moneda:     string,
    limite:     string
}
