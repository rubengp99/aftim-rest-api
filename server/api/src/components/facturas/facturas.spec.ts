const request = require('supertest')
import { App } from "./../../app";
import { IFacturas,IDetFacturas } from "./model";
const datoPrueba : IFacturas= {
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
const subDato : IDetFacturas = {
    //     id:               null,
    adm_enc_facturas_id: 1,
    adm_conceptos_id: 2,
    adm_vendedor_id: 2,
    costo: 100,
    costo_dolar: 2.00,
    precio: 2,
    precio_dolar: 1.00,
    descuentopro: 2,
    fecha_at: '10-10-1001',
    cantidad: 1,
    despachado: 1,
    devuelto: 0,
    adm_seriales_id: 1,
    monto_documento: 2,
    adm_lotes_id: 2
}
const envio = {
    data: datoPrueba,
    data1:[subDato]
}


//testing endpoints 
describe('testing get endpoint from facturas #facturas #get #endpointTesting', () => {


    it('devolver todas las facuras #facturas #get #All', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/factura`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(200);
    })


    it('devolver ingresos totalesde facturas #facturas #get #AllIngesos', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/factura/total`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(200);
    })


    it('devolver cantidad de facturas existentes #facturas #get #Allexistences', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/factura/cantidad`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(200);
    })


    it('devolver  facturas en concreto #facturas #get #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/factura/4`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(200);
    })


})


describe('testing post endpoints #facturas #endpoints #post', () => {


    it('crear nueva factura #post #create', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/factura/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(envio)
        expect(res.status).toEqual(201);
    })


    it('actualizar una factura #post #update', async () => {
        const { app } = new App();
        const resUpdated = {
            message: "Record updated"
        }
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 201
        }
        //execute
        const res = await request(app).post(`/api/factura/4`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(envio)
        expect(res.body.message).toEqual(resUpdated.message);//this will test the controller result
        expect(res.status).toEqual(ifDontExistExeption(res.body));//this will test endpoint route
    })


    it('actualizar un detalle en concreto de una factura #post #update #one', async () => {
        const { app } = new App();
        const resUpdated = {
            message: "Record updated"
        }
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 201
        }
        //execute
        const res = await request(app).post(`/api/factura/6/detalles/7`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ data: envio.data1[0] })
        expect(res.status).toEqual(ifDontExistExeption(res.body));//this will test endpoint route
    })
})


describe('testing delete endpoints #facturas #endpoints #delete', () => {

    it('borrar una factura #delete #one', async () => {
        const { app } = new App();

        const resOnDelete = (message) => {
            return message === "Record deleted" || message === 'The element not exist'
        }
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 200
        }
        //execute
        const res = await request(app).delete(`/api/factura/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(envio)
        expect(resOnDelete(res.body)).toEqual(true);//this will test the controller result
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })


    
    it('borrar un detalle de una factura en concreto #delete #one #detail', async () => {
        const { app } = new App();
        const resOnDelete = (message) => {
            return message === "Record deleted" || message === 'The element not exist'
        }
        const ifDontExistExeption = (message) => {
            return message === 'The element not exist' ? 404 : 200
        }
        //execute

        const res = await request(app).delete(`/api/factura/5/detalles/6`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ data: envio.data1[0].cantidad })

        expect(resOnDelete(res.body)).toEqual(true);//this will test the controller result
        expect(res.status).toEqual(ifDontExistExeption(res.body));
    })
})