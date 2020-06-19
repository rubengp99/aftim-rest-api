const request = require('supertest')
import { App } from "./../../app";
import { IDeposito } from "./model";
let tenantId: string = "almendras"
const target = "depositos";
const DatosPrueba: IDeposito = {
    nombre: '',
    usuario_id: 6
}
const pack = {
    data: DatosPrueba,
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
        const res = await request(app).get(`/api/${target}`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/${target}/9`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })


        //check
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener conceptos de un deposito #Get #One #Concepts', async () => {
        const holi = { query: { fields: 'id', limit: "" } };
        const res = await request(app).get(`/api/${target}/3/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send(holi);

        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})
describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/${target}`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send(pack)
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualzar uno #Update #One', async () => {
        const res = await request(app).post(`/api/${target}/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send(pack)
        //check
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/${target}/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send(pack)
            
            //check
            expect(res.status).toEqual(ifDontExistExeptionStatus(res.body,200));
    })

})