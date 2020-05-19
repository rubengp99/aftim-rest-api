import { IGrupo } from "components/grupos/model";

export interface ISubgrupo{
    id:number,
    adm_grupos_id:number,
    nombre:string,
    visualizar:boolean,
    posicion:number,
    imagen?:string,
    grupo?: IGrupo
}