import { IRuta } from './model';
import { App } from '../../app';
import request from 'supertest';
import {DATABASE_NAME} from "./../../keys";
let tenantId: string = DATABASE_NAME;
const target = "rutas";
describe(`Get Routes #Get `, () => {
    const app = new App();
    test(`Get #Get #All`, async () => {
        const response = await request(app.app)
            .get(`/api/${target}`)
            .set(`x-access-control`, `{"user":"admin","password":"123456"}`)
            .set(`tenant-id`, tenantId)
        expect(response.body.data).toBeDefined();
        expect(response.status).toBe(200);
    });
    test(`Get #Get #One`, async () => {
        const response = await request(app.app)
            .get(`/api/${target}/1`)
            .set(`x-access-control`, `{"user":"admin","password":"123456"}`)
            .set(`tenant-id`, tenantId)
        expect(response.body.data).toBeDefined();
        expect(response.status).toBe(200);
    });
})