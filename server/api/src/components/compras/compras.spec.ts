const request = require('supertest')
import { App } from "./../../app";
import { ICompras,IDetCompras } from "./model";
let tenantId: string = "almendras"
const target = "compras";

const datosPrueba:ICompras  = {
    numero_factura:           '',
    adm_proveedor_id:          2,
    adm_enc_orden_compra_id:   2,
    adm_enc_recepcion_id:      2,
    fecha_at:                  '',
    numero_control:            '',
    fecha_in:                  '',                
    subtotal:                  1,
    subtotal_dolar:            1,
    descuento:                 1,
    descuento_dolar:           1,
    descuento_global:          1,
    descuento_global_dolar:    1,
    iva:                       1,
    retencion:                 1,
    abono:                     1,
    abono_dolar:               1,
    status:                    1,
    observacion:               '',
    fecha_compra:              '',
    riva:                      1,
    procesado:                 1,
    imagen:                    '',
}
const subDato : IDetCompras = {
    adm_enc_compra_id: 1,
    adm_depositos_id:  1,
    adm_conceptos_id:  1,
    costo:             1,
    descuento:         1,
    cantidad:          1,
    iva:               1,
    serial_inicial:    '',
    serial_final:      '',
}
const pack = {
    data: datosPrueba,
    data1: subDato
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
        const res = await request(app).get(`/api/${target}/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .set('tenant-id', tenantId)
            .send({ query: { fields: 1, limit: "" } })
        expect(ifDontExistExeptionData(res.body)).toBeDefined();
        expect(res.status).toEqual(ifDontExistExeptionStatus(res.body, 200));
    })
})