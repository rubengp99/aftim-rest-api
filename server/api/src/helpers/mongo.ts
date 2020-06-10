import mongoose from "mongoose";
import { newMultiTenantConnection } from "../mongodb"

export const createInsertFunc = async function(tenantId: string, colName: string) {
    return async function (schema: mongoose.Schema, object: Object){
        try {
            let db = await newMultiTenantConnection(tenantId)
            let model = mongoose.model(colName, schema)
        
            let document = new model(object)
            
            //documente esto por que daba error al compilar
            //se tiene que revisar ese metodo once me da error (Irio)
            
            /*db?.once("open", function() {

                document.save(function (err) {
                    if (err) return console.error(err);
                    console.log("[SUCCESS] document saved.");
                });

            })

            return document;*/
            return null;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}
