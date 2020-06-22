const request = require('supertest')
import { App } from "./../../app";
import { IUsuario } from "./model";
import {DATABASE_NAME} from "./../../keys";
let tenantId: string = DATABASE_NAME;
const target = "usuario";
const dataPrueba :IUsuario = {
    nombre:         '',
    apellido:       '',
    fecha_nac:      '',
    recovery:"",
    recoverydate : "",
    login:          "",
    password:       "",
    perfil_id:      1,
    email:          "",
    tema:           "",
    app_ajax:       1,
    datagrid:       1,
    adm_empresa_id: 1,
    imagen:         '',
    pool:           '',
    usuario_at:     '',
    usuario_in:     '',
    adm_caja_id:        1,
    adm_vendedor_id:1,
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
    test('Obtener pedidos de usuario #Get #One #concepts', async () => {
        const res = await request(app).get(`/api/${target}/1/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})

describe('Post Routes #Post', () => {

    test('Actualizar uno #Update #One', async () => {
        const res = await request(app).post(`/api/${target}/17`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({data:dataPrueba})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/${target}/14`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body.message, 200));
    })

})
