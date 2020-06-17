const request = require('supertest')
import { App } from "./../../app";
import { ISubgrupo } from "./model";

const datosPrueba : ISubgrupo = {
    adm_grupos_id:  1,
    nombre:         '',
    visualizar:     true,
    posicion:       2,
    imagen:        '',
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
        const res = await request(app).get(`/api/subgrupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/subgrupos/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener en orden de ventas #Get #Order #sells', async () => {
        const res = await request(app).get(`/api/subgrupos/mostsold`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener conceptos de subgrupo #Get #One #concepts', async () => {
        const res = await request(app).get(`/api/subgrupos/1/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener ventas #Get #One #sells', async () => {
        const res = await request(app).get(`/api/subgrupos/1/sell`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})
describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/subgrupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:datosPrueba})
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualizar uno #Update #One', async () => {
        const res = await request(app).post(`/api/subgrupos/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:datosPrueba})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/subgrupos/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })

})
