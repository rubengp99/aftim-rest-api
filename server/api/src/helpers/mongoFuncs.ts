import mongoose from "mongoose";
import { newMultiTenantConnection } from "../mongoConn"

export const createInsertFunc = async function(tenantId: string, colName: string) {
    return async function (schema: mongoose.Schema, object: Object){
        try {
            let db = await newMultiTenantConnection(tenantId)
            let model = mongoose.model(colName, schema)
        
            let document = new model(object)


            return document;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}
