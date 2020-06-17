const request = require('supertest')
import { App } from "./../../app";
import { ICliente } from "./model";

const datosPrueba : ICliente = {
    nombre: '',
    nombre_comercial: '',
    cedula:'',
    fecha_at: '',
    fecha_in:'',
    fecha_nac:'',
    sexo: '',
    adm_tipo_estatus_id: 1,
    telefono1: '',
    telefono2: '',
    telefono3: '',
    direccion: '',
    direccion_fisica: '',
    horario: '',
    descuento: 2,
    adm_grupo_cliente_id: 1,
    limite_credito: 2,
    tarifa: '',
    contribuyente: '',
    adm_cobrador_id: 1,
    adm_vendedor_id: 1,
    adm_zonas_id: 1,
    correo_electronico: '',
    correo_electronico2: '',
    pag_web: '',
    dias_credito: 1,
    creditos: 1,
    contacto: '',
    telefono_contacto: '',
    observacion: '',
    adm_estado_id: 1,
    adm_ciudad_id: 1,
    empleado: 1,
}
const pack = {
    data: datosPrueba,
    data1: []
}
const { app } = new App();
const ifDontExistExeptionStatus = (message, expected) => {
    return message.message === 'The element not exist' ? 404 : expected
}
const ifDontExistExeptionData = (message) => {
    return message.message === 'The element not exist' ? [] : message.data
}
describe('Get Routes', () => {
    test('Obtener todos #Get #All', async () => {
        const res = await request(app).get(`/api/clientes`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/clientes/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(ifDontExistExeptionStatus({message:res.body}, 200));
    })
    test('Obtener orden de compras #Get #Order #Compras', async () => {
        const res = await request(app).get(`/api/clientes/mostbuyers`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener compras de un cliente #Get #One #Compras', async () => {
        const res = await request(app).get(`/api/clientes/1/buys`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
    test('Obtener devolucions de un cliente #Get #One #devolucions', async () => {
        const res = await request(app).get(`/api/clientes/1/devolutions`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})

describe('Post Routes #Post', () => {
    test('Crear uno #Create #One', async () => {
        const cedula = Object.assign(datosPrueba,{cedula:`${Math.floor(Math.random()*((999999 - 0) - 0))}`})
        const res = await request(app).post(`/api/clientes`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:cedula})
        expect(res.body.message).toBeDefined();
        expect(res.status).toEqual(201);
    })
    test('Actualizar uno #Update #One', async () => {
        const cedula = Object.assign(datosPrueba,{cedula:`${Math.floor(Math.random()*((999999 - 0) - 0))}`})
        const res = await request(app).post(`/api/clientes/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:cedula})
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 201));
    })
})
describe('Delete Routes #Delete', () => {
    test('Delete uno #Delete', async () => {
        const res = await request(app).delete(`/api/clientes/3`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(pack)
        //check
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })

})