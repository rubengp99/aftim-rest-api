import { IRuta } from './model';
import { App } from '../../app';
import request from 'supertest';

describe('Get Routes #Get ', () => {
    const app = new App();
    test('Get #Get #All', async () => {
        const response = await request(app.app)
            .get('/api/rutas')
            .set('x-access-control', '{"user":"admin","password":"123456"}');
        expect(response.body.data).toBeDefined();
        expect(response.status).toBe(200);
    });
    test('Get #Get #One', async () => {
        const response = await request(app.app)
            .get('/api/rutas/1')
            .set('x-access-control', '{"user":"admin","password":"123456"}');
        expect(response.body.data).toBeDefined();
        expect(response.status).toBe(200);
    });
})