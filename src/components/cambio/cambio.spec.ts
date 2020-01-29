import { get } from './controller';
import { connect,disconnect } from '../../dbs';
connect();
describe('Get',()=>{
    beforeAll(()=>{
        connect();
    })
    test('Response', async ()=>{
        const data = await get({});
        expect(data.code).toBe(200);
        expect(data.response).toBeDefined();
    });
    afterAll(async()=>{
        await disconnect();
    });
});
