const request = require('supertest')
import { App } from "./../../app";
import {IEmpresa} from "./model";

//testing endpoints
describe('testing get endpoint empresas  #endpoint #get', ()=>{
    it('ver todas #get #All' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver una empresa #get #one' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/2`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver conceptos de una empresa #get #oneConcept' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/2/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver depositos de una empresa #get #oneDepositos' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/6/depositos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver grupos de una empresa #get #oneGrupos' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/grupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver cargos de una empresa #get #oneCargos' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/cargos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver conceptos de un grupo de una empresa #get #oneConceptGroup' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/grupos/2/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver conceptos de un grupo de una empresa #get #oneConceptGroup' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/grupos/2/conceptos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver subgrupos de una empresa #get #oneSubgroups' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/subgrupos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver pedidos de una empresa #get #onePedidos' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/pedidos`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
    it('ver usuarios de una compania #get #oneusers' ,async ()=>{
        const { app } = new App();
        const res = await request(app).get(`/api/empresa/3/usuario`)
            .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        console.log(res);
        expect(res.status).toEqual(200);
    })
})