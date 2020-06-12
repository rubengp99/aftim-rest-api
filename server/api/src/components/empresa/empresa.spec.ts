const request = require('supertest')
import { App } from "./../../app";
import { IEmpresa } from "./model";
import { utimes } from "fs-extra";
const datosPrueba: IEmpresa = {
    rif: 'J-00000000-0',
    razon_social: '',
    nombre_comercial: '',
    fecha_registro: '',
    direccion: '',
    telefono1: '',
    telefono2: '',
    telefono3: '',
    pag_web: '',
    correo_electronico: '',
    correo_electronico2: '',
    twitter: '',
    facebook: '',
    instagram: '',
    firma_digital: '',
    tipo_imagen: '',
    imagen: '',
    licencia_licores: 1,
    nota: '',
    marca_agua: '',
    tipo_calculo: 1,
    contribuyente_especial: 1,
    nota2: '',
    color_presupuesto: '',
    img_barcode: '',
    modelo: 1
}
const envio = {
    data: datosPrueba
}
//testing endpoints
describe('testing get endpoint empresas  #endpoint #get', () => {
    it('ver todas #get #All', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver una empresa #get #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver conceptos de una empresa #get #oneConcept', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/2/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver grupos de una empresa #get #oneGrupos', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/grupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(200);
    })


    it('ver depositos de una empresa #get #oneDepositos', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/depositos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })


    it('ver cargos de una empresa #get #oneCargos', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/cargos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver conceptos de un grupo de una empresa #get #oneConceptGroup', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/grupos/2/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver conceptos de un grupo de una empresa #get #oneConceptGroup', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/grupos/2/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver subgrupos de una empresa #get #oneSubgroups', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/subgrupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver pedidos de una empresa #get #onePedidos', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })


    it('ver usuarios de una compania #get #oneusers', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/empresa/3/usuario`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })

        expect(res.status).toEqual(200);
    })

})

describe('testing post endpoints #post #endpoint', () => {
    it('crear una empresa #post #create #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/empresa/`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(envio)
            expect(res.body.message).toBeDefined()
            expect(res.status).toEqual(201);
    })


    it('actualiza una empresa #post #update #one', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).post(`/api/empresa/1`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(envio);
        expect(res.body.message).toBeDefined()
        expect(res.status).toEqual(201);
    })


    it('actualiza el precio de todos los conceptos de una empresa #post #one #update  #concepts', async () => {
        const { app } = new App();
        
        //execute
        const res = await request(app).post(`/api/empresa/3/adjustPrice`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:{percent:10}})
        
        expect(res.body.message).toBeDefined()
        expect(res.status).toEqual(201);
    })
})
describe('testing delete endpoint #endoint #delete',()=>{
    it('eliminar una empresa #delete #one #empresa', async ()=>{
        const { app } = new App();
        //execute
        const res = await request(app).delete(`/api/empresa/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({data:{percent:10}})

            console.log(res)
        expect(res.body).toEqual("Record deleted")
        expect(res.status).toEqual(200);
    })
})