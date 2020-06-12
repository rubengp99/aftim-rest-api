const request = require('supertest')
import { App } from "./../../app";

import { IPedidos, IDetPedidos } from "./model";
const datosPrueba: IPedidos = {
    adm_empresa_id: 1,
    rest_mesas_id: 1,
    rest_estatus_id: 1,
    estado: '',
    cant_personas: 2,
    fecha_at: '',
    fecha_in: '',
    usuario_id: 3,
    autorizo: 1,
    motivo: '',
    observacion: '',
    adm_clientes_id: 1,
    adm_enc_facturas_id: 2,
    imagen: ''
}
const detallesPrueba: IDetPedidos = {
    rest_pedidos_id: '',
    adm_conceptos_id: '',
    cantidad: 4,
    precio: 1,
    fecha_at: '',
    fecha_in: '',
    rest_estatus_id: '',
    estado: '',
    observacion: '',
    rest_areas_id: '',
    autorizo: '',
    motivo: '',
    impreso: 1,
    entrada: 2,
    usuario_id: '',
    cortesia: 2,
    rest_motivo_anul_id: '',
}
// testing endpoint routes from pedidos

describe('testing get routes #pedidos #get', () => {


    it('ver todos los pedidos #get #All', async () => {
        const { app } = new App();
        //execute

        const res = await request(app).get(`/api/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver estado de todos los pedidos #get #All #states', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/pedidos/stats`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver un pedido #get #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/pedidos/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver conceptos e un pedido #get #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/pedidos/1/conceptos/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('obtener informacion bancaria de un pedido #get #one #information', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/pedidos/1/movimiento_banco/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })
})
describe('testing post endpoints  #endpoint #post', () => {
    it('crea un nuevo pedido #post #create #pedido', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ data: datosPrueba, data1: detallesPrueba });
        expect(res.body.message).toBeDefined()
        expect(res.status).toEqual(201);
    })

    it('actualiza un  pedido #post #update #pedido', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/pedidos/103`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ data: datosPrueba, data1: detallesPrueba });
        expect(res.body.message).toBeDefined()
        expect(res.status).toEqual(201);
    })


    it('actualiza detalles de un  pedido #post #update #pedido #details', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/pedidos/103/detalles/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data: detallesPrueba })
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
})

describe('testing delete endpoints #endpoint #delete', ()=>{
    it('borra un pedido #delete #one', async ()=>{
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({})
        console.log(res)
        expect(res.body).toEqual('Record deleted');
        expect(res.status).toEqual(201);
    })
})