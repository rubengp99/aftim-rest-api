const request = require('supertest')
import { App } from "./../../app";
import { IGaleria } from "./model";

const datosPrueba: IGaleria = {
    adm_conceptos_id:   1,
    imagen:         ''
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
        const res = await request(app).get(`/api/galeria`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/galeria/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})

describe('Post Routes #Post', () => {
    /*test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/galeria`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:datosPrueba})
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualizar uno #Update #One', async () => {
        const res = await request(app).post(`/api/galeria/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:datosPrueba})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })*/
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/galeria/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})