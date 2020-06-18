const request = require('supertest')
import { App } from "./../../app";
import { IVendedor } from "./model";
let tenantId: string = "almendras"
const target = "vendedor";
const dataPrueba :IVendedor = {
    nombre: '',
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
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/${target}/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener en orden de ventas #Get #Order #sells', async () => {
        const res = await request(app).get(`/api/${target}/mostsellers`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener ventas de vendedor #Get #One #concepts', async () => {
        const res = await request(app).get(`/api/${target}/1/sell`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})
describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/${target}`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({data:dataPrueba})
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualizar uno #Update #One', async () => {
        const res = await request(app).post(`/api/${target}/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({data:dataPrueba})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/${target}/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })

})
