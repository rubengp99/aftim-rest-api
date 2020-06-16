const request = require('supertest')
import { App } from "./../../app";
import { IBanco } from "./model";
const DatosPrueba: IBanco = {
    cuenta: '',
    fecha_at: '',
    adm_entidad_id: 1,
    fecha_apertura: '',
    direccion: '',
    telefono: '',
    adm_tipo_cuenta_id: 2,
    agencia: '',
    contacto: '',
    telefono_contacto: '',
    email_contacto: '',
    dias_diferidos: 1,
    ult_saldo_conciliado: 1,
    saldo_actual: 1,
    fecha_ult_conciliacion: '1',
    pto_venta: 1,
}
const pack = {
    data: DatosPrueba,
    data1: []
}
const { app } = new App();
describe('Get Routes', () => {
    test('Obtener todos #Get #All', async () => {
        const res = await request(app).get(`/api/banco`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/banco/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
})
describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const res = await request(app).post(`/api/banco`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualzar uno #Update #One', async () => {
        const res = await request(app).post(`/api/banco`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
            const ifDontExistExeption = (message) => {
                return message === 'The element not exist' ? 404 : 201
            }
            //check
            expect(res.body.message).toBeDefined();
            expect(res.status).toEqual(ifDontExistExeption(res.body));
    })
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete #One', async () => {
        const res = await request(app).delete(`/api/banco/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
            const ifDontExistExeption = (message) => {
                return message === 'The element not exist' ? 404 : 200
            }
            //check
            expect(res.status).toEqual(ifDontExistExeption(res.body));
    })

})

