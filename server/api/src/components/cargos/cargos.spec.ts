const request = require('supertest')
import { App } from "./../../app";
import { ICargo } from "./model";

//testing endpoints routes
import {DATABASE_NAME} from "./../../keys";
let tenantId: string = DATABASE_NAME;
const target = "cargos";

const datoPrueba: ICargo = {
    // id?:                string | number,
    fecha_at: '',
    fecha_in: '',
    adm_conceptos_id: '',
    cantidad: '',
    adm_depositos_id: '',
    usuarios_id: '',
    adm_empresa_id: ''
}
describe('testing get endpoint routes #cargos #endpoint #get', () => {
    it(' todos los cargos #conceptos #get #All', async () => {
        const { app } = new App();
        //execute
        const res = await request(app).get(`/api/${target}`)
        .set('tenant-id', tenantId)    
        .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        
        expect(res.status).toEqual(200);
    })
    it('un cargo en concreto status 200 #conceptos #get #one', async () => {
        const { app } = new App();
        const res = await request(app).get(`/api/${target}/3`)
        .set('tenant-id', tenantId)    
        .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send({ query: { fields: 1, limit: "" } })
        expect(res.status).toEqual(200);
    })
})
describe('testing post endpoints #cargos #endpoint #post', () => {
  /*  it('crea un nuevo cargo #post #create', async () => {
        const { app } = new App();
        const res = await request(app).post(`/api/${target}`)
        .set('tenant-id', tenantId)    
        .set('x-access-control', '{"user":"admin","password":"123456"}')
            .send(datoPrueba)
        console.log(res);
        expect(res.status).toEqual(200);
    })*/
})