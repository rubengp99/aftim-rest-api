import {IMovimientosCaja} from "./model";
const request = require('supertest');
import {getOne,get,create} from "./controller";

const datosPrueba : IMovimientosCaja = {
    adm_caja_id:1,
    fecha_at:'',
    fecha_in:'',
    hora_in:'',
    adm_tipo_pago_id:1,
    adm_tipo_movimiento_id:2,
    adm_banco_id:1,
    referencia:'',
    debito:1,
    credito:1,
    credito_dolar:1,
    descripcion:'',
    origen:'',
    numero_origen:'',
    adm_entidad_id:1,
    islrnc:1,
    riva:1,
    fecha_transaccion:'',
    imagen:''
}
describe('Controller #controllers', () => {
    test('Get all #All', async () => {
        const data = await get({});
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        expect(data.message || data.response).toBeDefined();
    })
    test('Get one #One', async () => {
        const data = await getOne(1,{});
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        expect(data.message || data.response).toBeDefined();
    })
    test('Create One #One', async () => {
        const data = await create({data:datosPrueba},{holi:''});
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        expect(data.message || data.response).toBeDefined();
    })
 })


 const { app } = new App();
const ifDontExistExeptionStatus = (message, expected) => {
    return message === 'The element not exist' ? 404 : expected
}
const ifDontExistExeptionData = (message) => {
    return message === 'The element not exist' ? [] : message.data
}
 describe('routes',()=>{
     describe('Get',()=>{
         test('Get All', async()=>{
            const res = await request(app).get(`/api/movimiento_caja`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 'id', limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
         })
         test('Get one', async()=>{
            
            const res = await request(app).get(`/api/movimiento_caja/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
            
        })
     })


     describe('Post',()=>{
        test('Create One', async()=>{
            
             const res = await request(app).post(`/api/movimiento_caja`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:datosPrueba})
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
            
        })
    })
 })