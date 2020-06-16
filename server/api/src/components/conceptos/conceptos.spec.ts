const request = require('supertest')
import { App } from "./../../app";

import { IConcepto } from './model';
import { IGrupo } from "./../grupos/model";
import { ISubgrupo } from "./../subgrupos/model";
const grupoPrueba: IGrupo = {
    id: 80,
    nombre: '',
    imagen: '',
    visualizar: true,
    posicion: true,
}
const subgrupoPrueba: ISubgrupo = {
    id: 80,
    adm_grupos_id: 1,
    nombre: '',
    visualizar: true,
    posicion: 1,
    imagen: 'default.png',
    grupo: grupoPrueba
}

let nuevoDataPrueba: IConcepto = {
    adm_empresa_id: 1,
    nombre: 'mercado',
    adm_tipos_conceptos_id: 2,
    fecha_at: '2018-03-01',
    precio_a: 5000.00,
    precio_dolar: 10,
    costo_dolar: 10,
    // id?: string | number | undefined;
    descripcion: '',
    talla: 'n',
    color: '',
    descuento: 10,
    serial_estatico: 1,
    serial_dinamico: 2,
    existencia_minima: 1,
    existencia_maxima: 80,
    adm_ubicacion_id: 1,
    costo: 200,
    ultimo_costo: 100,
    costo_mayor: 200,
    costo_promedio: 200,
    fecha_in: '2018-03-01',
    fecha_uc: '2018-03-01',
    adm_grupos_id: 1,
    adm_subgrupos_id: 1,
    presentacion: 2,
    adm_unidades_id: 1,
    fecha_hora: 100,
    adm_marcas_id: 1,
    estado: false,
    pvp: 2,
    precio_b: 2,
    utilidad: 2,
    utilidad_a: 2,
    utilidad_b: 2,
    utilidad_c: 2,
    utilidad_dolar: 2,
    precio_variable: 2,
    retiene: 2,
    farm_principio_activo_id: 2,
    imagen: '',
    costo_adicional: 2,
    costo_adicional2: 2,
    cant_ensamblado: 2,
    licor: 2,
    porcentaje: 2,
    visible_pv: 2,
    visible_web: 2,
    rest_areas_id: 2,
    setcortesia: 2,
    exento: 2,
    merma: 2,
    existencia_c: 2,
    obviar_ajuste: 2,
  //   presentaciones: [],
}


//    probando endpoints

describe(' ruta conceptos #endpointTest #conceptos', () => {

    
    describe('get #conceptos #get ', () => {


        it('deberia devolver status 200 #conceptos #get #All', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            expect(res.body.data).toBeDefined();
            expect(res.status).toEqual(200);
        })


        it('deberia devolver conceptos ordenados por ventas #conceptos #get #ventas', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/mostsold`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } });
            expect(res.body.data).toBeDefined();
            expect(res.status).toEqual(200);
        })

        it('devolver conceptos ordenados devoluciones #conceptos #get #ordendevoluciones', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/mostreturned`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
            expect(res.body.data).toBeDefined();
            expect(res.status).toEqual(200);
        })

        it('devolver ventas de un concepto #conceptos #get #ventas', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/3/sell`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

        it('devolver devoluciones de un concepto #conceptos #get #devoluciones', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/3/devolutions`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

        it('si un concepto se ha vendido alguna vez #conceptos #get #wasSoldSometime', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/4/issold`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

        it('Obtener un concepto particular #conceptos #get #one', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/4`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

        it('Obtener depositos de un concepto #conceptos #get #one #depositos', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/7/depositos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

        it('Obtener foto de un concepto #conceptos #get #one #imagen', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/3/photos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

        it('Obtener presentacion de un concepto #conceptos #get #one #presentaciones', async () => {
            const { app } = new App();
            const res = await request(app).get(`/api/conceptos/7/presentaciones`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send({ query: { fields: 1, limit: "" } })
                const ifDontExistExeption = (message) => {
                    return message === 'The element not exist' ? 404 : 200
                }
                //check
                expect(res.status).toEqual(ifDontExistExeption(res.body));
        })
    })
    describe('Post  #conceptos #post ', () => {


        it('ruta de crear un nuevo concepto deberia devolver status200 #post #crear', async () => {
            const { app } = new App();
            const onePrueba = {// aqui seteamos datos que deben ser irrepetibles para que los est no den error por culpa de los otros test
                //data: Object.assign(nuevoDataPrueba, { id:Math.random() * ((9000 -800) + 800), codigo: `${Math.random()}`, referencia: `${Math.random()}` }),
                data1: [{}, {}],
                data: nuevoDataPrueba,
            }
            //   nuevoDataPrueba.codigo =`${Math.random()}` // para crear un codigo unico y no de error
            //   nuevoDataPrueba.referencia = `${Math.random()}`
            const res = await request(app).post(`/api/conceptos`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send(onePrueba);
            expect(res.body.message).toBeDefined();
            expect(res.status).toEqual(201);
        })


        it('deberia actualizar un concepto devolver 200 #post #actualizar', async () => {
            const { app } = new App();
            const onePrueba = { // aqui seteamos datos que deben ser irrepetibles para que los est no den error por culpa de los otros test
                data: nuevoDataPrueba,
                data1: [{}, {},{}]
            }
            // para crear un codigo unico y no de error
            const res = await request(app).post(`/api/conceptos/3`)
                .set('x-access-control', '{"user":"admin","password":"123456"}')
                .send(onePrueba)
            const ifDontExistExeption = (message) => {
                return message === 'The element not exist' ? 404 : 201
            }
            //check
            expect(res.status).toEqual(ifDontExistExeption(res.body));
        })

    })


})

