import { get, getOne } from './controller';
import { connect,disconnect } from '../../dbs';

connect();
describe('Cambio controller',()=>{
    beforeAll(()=>{
        connect();
    })
    test('Get', async ()=>{
        const data = await get({});
        expect(data.code).toBe(200);
        expect(data.response).toBeDefined();
    });
    test('Get One', async () =>{
        const data = await getOne(1,{});
        expect(data.code).toBe(200);
        expect(data.response).toBeDefined();
    });
    afterAll(async()=>{
        await disconnect();
    });
});
