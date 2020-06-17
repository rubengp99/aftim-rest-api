import { IAreasAtencion } from './model';
import { get, getOne, create, update, remove } from './controller';
import { App } from '../../app';

import request from 'supertest';
let tenantId: string = "test"

const dataPrueba: IAreasAtencion = {
    id: 1,
    nombre: 'COCINA',
    impresora: 'CUSTOM Q3'
};
const onePrueba = {
    data: dataPrueba,
    link: {
        prev: 'First Record',
        sig: 'http://localhost:81/api/areas_atencion/2'
    }
}


describe('Controller', () => {
    test('Get all', async () => {
        const data = await get({}, tenantId);
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        expect(data.message || data.response).toBeDefined();
        
    });
    test('Get One', async () => {
        const data = await getOne(1, {}, tenantId);
        expect(data).toBeDefined();
        expect(data.code).toEqual(expect.any(Number));
        if(data.code === 200){
            expect(data.response).toEqual(onePrueba);
        }else{
            expect(data.message).toBeDefined();
        }
    });
    // test('Create', async () => {
    //     const data = await create({ nombre: 'Test jest', impresora: 'CUSTOM Q3' });
    //     expect(data).toBeDefined();
    //     expect(data.code).toBe(201);
    //     expect(data.message).toBe('Record created');
    // });
    // test('Updated', async () => {
    //     const data = await update({ id: 1 }, { nombre: 'Test jest', impresora: 'CUSTOM Q3' });
    //     expect(data).toBeDefined();
    //     expect(data.code).toBe(201);
    //     expect(data.message).toBe('Record updated');
    // });
    // test('Deleted', async () => {
    //     const data = await remove({ id: 1 });
    //     expect(data).toBeDefined();
    //     expect(data.code).toBe(200);
    //     expect(data.message).toBe('Record deleted');
    // });
});

describe('Router', () => {
    const app = new App();
    
    test('Get',async ()=>{
        const response = await request(app.app)
                        .get('/api/areas_atencion')
                        .set('x-access-control','{"user":"admin","password":"123456"}')
                        .set('tenantId', tenantId);
        expect(response.status).toBe(200);
    });
});