const request = require('supertest')
import { App } from "./../../app";

import { IPedidos, IDetPedidos } from "./model";
let tenantId: string = "almendras"
const target = "pedidos";
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

        const res = await request(app).get(`/api/${target}`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver estado de todos los pedidos #get #All #states', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/${target}/stats`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver un pedido #get #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/${target}/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver conceptos e un pedido #get #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/${target}/1/conceptos/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('obtener informacion bancaria de un pedido #get #one #information', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/${target}/1/movimiento_banco/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })
})
const elementToUpdate = {
    id: 103
}
describe('testing post endpoints  #endpoint #post', () => {
    it('crea un nuevo pedido #post #create #pedido', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/${target}`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ data: datosPrueba, data1: detallesPrueba });
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 201
        }
        //check
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })

    it('actualiza un  pedido #post #update #pedido', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/${target}/${elementToUpdate.id}`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ data: datosPrueba, data1: detallesPrueba });
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 201
        }
        //check
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })


    it('actualiza detalles de un  pedido #post #update #pedido #details', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/${target}/${elementToUpdate.id}/detalles/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ data: detallesPrueba })
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 201
        }
        //check
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })
})
const elementsToDelete = {
    id1: 65,
    id2: 2
}
describe('testing delete endpoints #endpoint #delete', () => {
    it('borra un pedido #delete #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).delete(`/api/${target}/${elementsToDelete.id1}`)//recive el id del elemento a borrar mediante la ruta 
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({})
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 200
        }
        //check
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })

    it('borra detalles de un  pedido #delete #one #details', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).delete(`/api/${target}/${elementsToDelete.id2}/detalles/1`) //recive el id del elemento a borrar mediante la ruta pimero el id del pedido 
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)//luego el id del detalle
            .send({})

        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 200
        }
        //check
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })
})