const request = require('supertest')
import { App } from "./../../app";
import { ICiudad } from "./model";
import {DATABASE_NAME} from "./../../keys";
let tenantId: string = DATABASE_NAME;
const target = "ciudad";

const datosPrueba: ICiudad = {
    adm_estado_id: 1,
    nombre: ''
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
        const res = await request(app).get(`/api/${target}`)
            .set('tenant-id', tenantId)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/${target}/1`)
            .set('tenant-id', tenantId)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})

describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/${target}`)
            .set('tenant-id', tenantId)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ data: datosPrueba })
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    }
    )
})