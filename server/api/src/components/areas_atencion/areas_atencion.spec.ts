import { IAreasAtencion } from './model';
import { get, getOne, create, update, remove } from './controller';
import { App } from '../../app';

import request from 'supertest';
//vars
import {DATABASE_NAME} from "./../../keys";
let tenantId: string = DATABASE_NAME;
const target = "areas_atencion";


const dataPrueba: IAreasAtencion = {
    nombre: `COCINA`,
    impresora: `CUSTOM Q3`
};
const onePrueba = {
    data: dataPrueba,
    link: {
        prev: `First Record`,
        sig: `http://localhost:81/api/${target}/2`
    }
}


describe(`Controller`, () => {
    test(`Get all`, async () => {
        const data = await get({}, tenantId);
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        expect(data.message || data.response).toBeDefined();

    });
    /*test(`Get One`, async () => {
        const data = await getOne(1, {});
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        if (data.code === 200) {
            expect(data.response).toEqual(onePrueba);
        } else {
            expect(data.message).toBeDefined();
        }
    });*/
});

describe(`Router`, () => {

    const app = new App();
    describe(`Get Routes #Get `, () => {
        test(`Get #Get #All`, async () => {
            const response = await request(app.app)
                .get(`/api/areas_atencion`)
                .set(`tenant-id`, tenantId)
                .set(`x-access-control`, `{"user":"admin","password":"123456"}`)  
            expect(response.body.data).toBeDefined();
            expect(response.status).toBe(200);
        });
        test(`Get #Get #One`, async () => {
            const response = await request(app.app)
                .get(`/api/${target}/1`)
                .set(`x-access-control`, `{"user":"admin","password":"123456"}`)
                .set(`tenant-id`, tenantId);
            expect(response.body.data).toBeDefined();
            expect(response.status).toBe(200);
        });
    })

    describe(`Post Routes #Post`, () => {
        test(`Create one #Create #One`, async () => {
            const response = await request(app.app)
                .post(`/api/${target}`)
                .set(`x-access-control`, `{"user":"admin","password":"123456"}`)
                .set(`tenant-id`, tenantId) 
                .send(onePrueba);
            expect(response.body.message).toBeDefined();
            expect(response.status).toBe(201);
        })
        test(`Update one #Update #One`, async () => {
            const response = await request(app.app)
                .post(`/api/${target}/4`)
                .send(onePrueba)
                .set(`x-access-control`, `{"user":"admin","password":"123456"}`)
                .set(`tenant-id`, tenantId);
                const ifDontExistExeption = (message) => {
                    return message === `The element not exist` ? 404 : 201
                }
                //check
                expect(response.body.message).toBeDefined();
                expect(response.status).toEqual(ifDontExistExeption(response.body));
        })
    })
    describe(`Delete routes #Delete`, () => {
        test(`Delete one #Delete #One`, async () => {
            const response = await request(app.app)
                .delete(`/api/${target}/5`)
                .send(onePrueba)
                .set(`x-access-control`, `{"user":"admin","password":"123456"}`)
                .set(`tenant-id`, tenantId);
            const ifDontExistExeption = (message) => {
                return message === `The element not exist` ? 404 : 200
            }
            //check
            expect(response.status).toEqual(ifDontExistExeption(response.body));
        })
    })
});