const request = require('supertest')
import { App } from "./../../app";
import { IDescargo, IDetDescargo} from "./model";

let tenantId: string = "almendras"
const target = "descargos";
const subData:   IDetDescargo  = {
    adm_enc_descargos_id:   1,
    adm_conceptos_id:       1,
    adm_depositos_id:      1,
    existencia:         2,
    descargo:          2,
}

const DatosPrueba: IDescargo = {
    fecha_at:           '',
    descripcion:        '',
    adm_tipo_descargo_id:   2,
    responsable:        2,
    autorizador:        2,
}

const pack = {
    data: DatosPrueba,
    data1: subData
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
            .send({ query: { fields: 'id', limit: "" } })
        expect(res.body.data).toBeDefined();
        expect(res.status).toEqual(200);
    })
    test('Obtener uno #Get #One', async () => {
        const res = await request(app).get(`/api/${target}/9`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 'id', limit: "" } })
        //check
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
})