const request = require('supertest')
import {App} from "../../app";

describe('probando enpoint de ruta conceptos #conceptos #endpointTest ', () => {
    describe('probando rutas Post de conceptos #conceptos #post #endpointTest', () => {
        it('deberia crear un nuevo concepto', async () => {
            const test = new App;
            const res = await request(test)
                .post('/api/conceptos')
                .send({
                    userId: 1,
                    title: 'test is cool',
                })
             //   console.log(res);
            expect(res.status).toEqual(201)
            expect(res.body).toHaveProperty('post')
        })
    })
})