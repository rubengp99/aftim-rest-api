const request = require('supertest')
import { App } from "./../../app";
import {IGrupo} from "./model";

const datosPrueba : IGrupo = {
    nombre:        '',
    imagen:        '',
    visualizar:   true,
    posicion:     true
}

const pack = {
    data: datosPrueba,
    data1: []
}
const { app } = new App();
const ifDontExistExeptionStatus = (message, expected) => {
    return message === 'The element not exist' ? 404 : expected
}
const ifDontExistExeptionData = (message) => {
    return message === 'The element not exist' ? [] : message.data
}

describe('Get Routes', () => {
    test('Obtener todos #Get #All', async () => {
        const res = await request(app).get(`/api/grupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/grupos/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener orden mas vendido #Get #Order #mostSold', async () => {
        const res = await request(app).get(`/api/grupos/mostsold`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener subgrupos de un grupo #Get #One #Subgroups', async () => {
        const res = await request(app).get(`/api/grupos/1/subgrupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener conceptos de un grupo #Get #One #Groups', async () => {
        const res = await request(app).get(`/api/grupos/1/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener ventas de un grupo #Get #One #Sells', async () => {
        const res = await request(app).get(`/api/grupos/1/sell`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})

describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/grupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualizar uno #Update #One', async () => {
        const res = await request(app).post(`/api/grupos/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)

        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })
})

describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/grupos/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })

})