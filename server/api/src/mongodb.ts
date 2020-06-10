import mongoose from "mongoose";
import {MONGO_URI ,MONGO_DB} from './keys';

const clientOptions = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    poolSize: 50,
    useNewUrlParser: true,
    autoIndex: false
};

export const newMultiTenantConnection = async function(tenantId: string){
    try {
        let DB = await mongoose.createConnection(`${MONGO_URI}/${tenantId}_${MONGO_DB}`, clientOptions);
        return DB;
    } catch (error) {
        console.log(`[CONNECTION ERROR] \n ${error}`)
        return null;
    }
}