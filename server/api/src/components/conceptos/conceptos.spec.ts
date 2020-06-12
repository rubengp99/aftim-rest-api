const request = require('supertest')
import { App } from "./../../app";

import { IConcepto } from './model';

const nuevoDataPrueba: IConcepto = {
    // id: 10040,
    adm_empresa_id: 1,
    nombre: 'mercado',
    tipos_conceptos_id: 2,
    fecha_at: '2018-03-01',
    precio_a: 5000.00,
    precio_dolar: 10,
    costo_dolar: 10,
    codigo: '00111111111',
    // id?: string | number | undefined;
    referencia: null,
    descripcion: null,
    talla: null,
    color: null,
    descuento: null,
    serial_estatico: null,
    serial_dinamico: null,
    existencia_minima: null,
    existencia_maxima: null,
    ubicacion_id: 1,
    costo: 200,
    ultimo_costo: 100,
    costo_mayor: 200,
    costo_promedio: 200,
    fecha_in: '2018-03-01',
    fecha_uc: '2018-03-01',
    grupos_id: '1',
    subgrupos_id: null,
    presentacion: null,
    unidades_id: null,
    fecha_hora: 100,
    marcas_id: null,
    estado: false,
    pvp: null,
    precion_b: null,
    utilidad: null,
    utiliad_a: null,
    utilidad_b: null,
    utilidad_c: null,
    utilidad_dolar: null,
    precio_variante: null,
    retiene: null,
    farm_principio_activo_id: null,
    imagen: null,
    costo_adicional: null,
    costo_adicional2: null,
    cant_ensamblado: null,
    licor: null,
    porcentaje: null,
    visible_pv: null,
    visible_web: null,
    rest_areas_id: null,
    setcortesia: null,
    exento: null,
    merma: null,
    exitencia_c: null,
    obviar_ajuste: null,
    iva: null,
    presentaciones: null,
    existencias: null,
    grupo: null,
    subgrupo: null,
    isSold: false
}
const onePrueba = {
    data: nuevoDataPrueba,
    data1: [{}, {}]
}

//    probando endpoints

describe(' ruta conceptos #endpointTest #conceptos', () => {

    describe('Post  #conceptos #post ', () => {

        /*it('ruta de crear un nuevo concepto deberia devolver status200 #post #crear', async () => {
            const { app } = new App();
            const res = await request(app).post(`/api/conceptos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send(onePrueba);
            console.log(res);
            expect(res.status).toEqual(200);
        })


        it('deberia actualizar un concepto devolver 200 #post #actualizar', async () => {
            const { app } = new App();
            const res = await request(app).post(`/api/conceptos/2`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send(onePrueba)
            console.log(res);
            expect(res.status).toEqual(200);
            // expect(res.body).toHaveProperty('post')


        })
*/

    })


    describe('get #conceptos #get ', () => {


        it('deberia devolver status 200 #conceptos #get #All', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })


        it('deberia devolver conceptos ordenados por ventas #conceptos #get #ventas', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/mostsold`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('devolver conceptos ordenados devoluciones #conceptos #get #ordendevoluciones', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/mostreturned`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('devolver ventas de un concepto #conceptos #get #ventas', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/3/sell`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('devolver devoluciones de un concepto #conceptos #get #devoluciones', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/3/devolutions`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('si un concepto se ha vendido alguna vez #conceptos #get #wasSoldSometime', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/4/issold`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('Obtener un concepto particular #conceptos #get #one', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/4`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('Obtener depositos de un concepto #conceptos #get #one #depositos', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/7/depositos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('Obtener foto de un concepto #conceptos #get #one #imagen', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/7/photos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })

        it('Obtener presentacion de un concepto #conceptos #get #one #presentaciones', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/7/presentaciones`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            console.log(res);
            expect(res.status).toEqual(200);
        })
    })
})

