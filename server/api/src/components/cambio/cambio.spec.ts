import { get, getOne } from './controller';
const request = require('supertest')
import { App } from "./../../app";
import {ICambio} from "./model";

let tenantId: string = "almendras"
const target = "cambio";

describe('Cambio controller',()=>{
    test('Get', async ()=>{
        const data = await get({},tenantId);
        expect(data.code).toBe(200);
        expect(data.response).toBeDefined();
    });
    test('Get One', async () =>{
        const data = await getOne(1,{}, tenantId);
        expect(data.code).toBe(200);
        expect(data.response).toBeDefined();
    });
});
const DatosPrueba : ICambio ={
    tasa:1,
    moneda:'bolivares',
    adm_empresa_id:2,
}
const pack = {
    data: DatosPrueba,
    data1: []
}
const { app } = new App();
describe('Get Routes', () => {
    test('Obtener todos #Get #All', async () => {
        const res = await request(app).get(`/api/cambio`)
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
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
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
        const res = await request(app).post(`/api/${target}/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send(pack)
            const ifDontExistExeption = (message) => {
                return message === 'The element not exist' ? 404 : 201
            }
            //check
            expect(res.body.message).toBeDefined();
            expect(res.status).toEqual(ifDontExistExeption(res.body));
    })
    describe('Delete Routes #Delete', () => {
        test('Delete uno  #Delete #One', async () => {
            const res = await request(app).delete(`/api/${target}/3`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .set('tenant-id', tenantId)
                .send(pack)
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })
    
    })
})
