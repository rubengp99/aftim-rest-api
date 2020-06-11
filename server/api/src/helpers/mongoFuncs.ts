import mongoose from "mongoose";
import { newMultiTenantConnection } from "../mongoConn"

export const createInsertFunc = async function(tenantId: string, colName: string):Promise<any> {
    return async function (schema: mongoose.Schema, object: Object):Promise<any>{
        try {
            let db = await newMultiTenantConnection(tenantId);

            if (db === null) return null;

            let model = db.model(colName, schema);
            
            if (typeof model === 'undefined') return null;

            let document = new model(object);

            await document.save(err => console.log(err));

            return document;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}
