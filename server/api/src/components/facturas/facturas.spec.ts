const request = require('supertest')
import { App } from "./../../app";
//import { IFacturas } from "./model";
const datoPrueba= {
    numero_factura: '121212312',
    numero_fiscal: '23213',
    serial_impresora: '213',
    fecha_at: '10-10-1100',
    fecha_in: '10-10-1010',
    adm_vendedor_id: 1,
    adm_clientes_id: 4,
    subtotal: 12312,
    subtotal_dolar: 12,
    iva: 2,
    facturado: true,
    estatus_pago: 1,
    abono: 12,
    abono_dolar: 123,
    adm_tipos_facturas_id: 3,
    adm_usuarios_id: 6,
    adm_caja_id: 1,
    observacion: '',
    adm_enc_presupuesto_id: 1,
    anulada: false,
    usuario_modificador: '',
    devuelto: 1,
    motivoreimpresion: '',
    afecta_factura: '',
    rest_pedidos_id: 65,
    fecha_hora: '10-10-1010',
    coo: '',
    estatus_entrega: 1,
    fecha_entrega: '10-10-1010',
}
const envio = {
    data:datoPrueba,
    data1:[{
   //     id:               null,
        adm_enc_facturas_id:   1,
        conceptos_id:      2,
        adm_vendedor_id:       2,
        costo:             100,
        costo_dolar:      2,
        precio:            2,
        precio_dolar:     2,
        descuentropro:     2,
        fecha_at:          '10-10-1001',
        cantidad:          1,
        despachado:        1,
        devuelto:          0,
        seriales_id:      1,
        monto_descuento:    2,
        lotes_id:          2
    }]
}
const vayalo = {
    data:{},
    data1:{}
}
//testing endpoints 
describe('testing get endpoint from facturas #facturas #get #endpointTesting', () => {
    it('devolver todas las facuras #facturas #get #All', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/factura`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('devolver ingresos totalesde facturas #facturas #get #AllIngesos', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/factura/total`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('devolver cantidad de facturas existentes #facturas #get #Allexistences', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/factura/cantidad`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('devolver  facturas en concreto #facturas #get #one', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/factura/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
})


describe('testing post endpoints #facturas #endpoints #post', () => {
    it('crear nueva factura #post #create', async () => {
        const { app } = new App();
        const res = await request(app).post(`/api/factura/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(envio)
        console.log(res);
        expect(res.status).toEqual(201);
    })
})