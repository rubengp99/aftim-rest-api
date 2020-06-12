const request = require('supertest')
import { App } from "./../../app";

import { IPedidos } from "./model";

// testing endpoint routes from pedidos

describe('testing get routes #pedidos #get', () => {
    it('ver todos los pedidos #get #All', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver estado de todos los pedidos #get #All #states', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/pedidos/stats`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver un pedido #get #one', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/pedidos/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver conceptos e un pedido #get #one', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/pedidos/1/conceptos/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('obtener informacion bancaria de un pedido #get #one #information', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/pedidos/1/movimiento_banco/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
})