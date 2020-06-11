const request = require('supertest')
import { App } from "./../../app";
import dotenv from 'dotenv';
dotenv.config();
describe('probando enpoints  #endpointTest ', () => {
    describe('probando endpoints de ruta conceptos #endpointTest #conceptos', () => {
        describe('probando rutas Post de conceptos #endpointTest #conceptos #post ', () => {
            it('deberia crear un nuevo concepto', async () => {
                const { app } = new App();
                //const req  = new Request;
                const res = await request(app).get(`/api/conceptos`)
                    .set('x-access-control', '{"user":"admin","password":"123456"}')
                    .send({ query: { fields: 1, limit: "" } })
                console.log(res);
                expect(res.status).toEqual(401);
                // expect(res.body).toHaveProperty('post')
            })
        })
    })

})