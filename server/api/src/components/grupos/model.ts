import { ISubgrupo } from "components/subgrupos/model";

export interface IGrupo {
    id?:            number | string,
    nombre?:        string,
    imagen?:        string,
    visualizar?:    boolean | number | string,
    posicion?:      boolean | number | string,
    subgrupos?:     ISubgrupo[]
}