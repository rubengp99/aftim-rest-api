const request = require('supertest')
import { App } from "./../../app";

import {IMovimientoBanco} from "./model";

const DataPrueba : IMovimientoBanco = {
    adm_banco_id:              1 ,
    adm_tipo_movimiento_id:    1 ,
    adm_caja_id:               1,
    fecha_at:              ''   ,
    adm_tipo_pago_id:        3   ,
    referencia:          ''      ,
    credito:             1      ,
    credito_dolar:      1       ,
    debito:            1        ,
    descripcion:         ''      ,
    beneficiario:      1        ,
    adm_entidad_id:          1  ,
    origen:                  ''   ,
    documento:               ''   ,
    efectivo:      1            ,
    cheque_mismo_banco:   1    ,
    cheque_otro_banco:  1       ,
    islr:                  1    ,
    comision:              1    ,
    fecha_cheque_mismo_banco: '' ,
    fecha_cheque_otro_banco: ''  ,
    conciliado: 1                ,
    fecha_conciliado:''          ,
    islrnc:1                    ,
    riva:1                      ,
    estatus:1                   ,
    fecha_transaccion:''         ,
    imagen: ''                  ,
} 
const pack = {
    data:DataPrueba,
    data1:[]
}
const { app } = new App();
describe('Get Routes #Get',()=>{

    test('Obtener todos #Get #All',async()=>{
        const res = await request(app).get(`/api/movimiento_banco`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.response.data).toBeDefined();
        expect(res.status).toEqual(200);
    })

    test('Obtener todos #Get #All',async()=>{
        const res = await request(app).get(`/api/movimiento_banco/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.response.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
})

describe('Post Routes #Post', ()=>{
    test('Crear Un movimiento #Create #One',async()=>{
        const res = await request(app).post(`/api/movimiento_banco/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
        expect(res.body.response.data).toBeDefined();
        expect(res.status).toEqual(201);
    })
    
})