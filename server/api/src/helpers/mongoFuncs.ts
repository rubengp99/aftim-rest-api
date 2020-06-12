import mongoose from "mongoose";
import { Filters, HasValue } from "./query.model"
import { newMultiTenantConnection } from "../mongoConn"

/**
 * 
 * @param tenantId is the identifier of the company which is requesting data
 * @param colName is the name of the collection data
 * @returns promise function
 */
export const createInsertFunc = async function(tenantId: string, colName: string):Promise<any> {
    /**
     * @param schema is the document scheme for mongo usage
     * @param object is the document object representation to insert
     */
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

/**
 * 
 * @param tenantId is the identifier of the company which is requesting data
 * @param colName is the name of the collection data
 * @returns promise function
 */
export const createRetrieveFunc = async function(tenantId: string, colName: string):Promise<any>{
    /**
     * @param schema is the document scheme for mongo usage
     * @param query is a interface with the mongo query options
     */
    return async function (schema: mongoose.Schema, query: Filters):Promise<any>{
        try {
            let limit = HasValue(query.limit) ? query.limit as number : 0;
            let offset = HasValue(query.offset) ? query.offset as number : 0;
            let order = HasValue(query.order) ? query.order as string : "asc";
            
            let db = await newMultiTenantConnection(tenantId);

            if (db === null) return null;

            let model = db.model(colName, schema);
            
            if (typeof model === 'undefined') return null;

            let document : any 
            
            document = model.find().skip(offset).limit(limit).sort(order);

            return document;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}

/**
 * 
 * @param tenantId is the identifier of the company which is requesting data
 * @param colName is the name of the collection data
 * @returns promise function
 */
export const createRetrieveOneFunc = async function(tenantId: string, colName: string):Promise<any>{
    /**
     * @param schema is the document scheme for mongo usage
     * @param id is the unique identifier of the document
     */
    return async function (schema: mongoose.Schema, id: string):Promise<any>{
        try {
            let db = await newMultiTenantConnection(tenantId);

            if (db === null) return null;

            let model = db.model(colName, schema);
            
            if (typeof model === 'undefined') return null;

            let document : any 
            
            document = model.findById(id);

            return document;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}

/**
 * 
 * @param tenantId is the identifier of the company which is requesting data
 * @param colName is the name of the collection data
 * @returns promise function
 */
export const createDeleteOneFunc = async function(tenantId: string, colName: string):Promise<any>{
    /**
     * @param schema is the document scheme for mongo usage
     * @param opts is a parameter which is need to be meet by the deleted document
     */
    return async function (schema: mongoose.Schema, opts: object):Promise<any>{
        try {
            let db = await newMultiTenantConnection(tenantId);

            if (db === null) return null;

            let model = db.model(colName, schema);
            
            if (typeof model === 'undefined') return null;

            let document : any 
            
            document = model.deleteOne(opts);

            return document;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}

export const createUpdateFunc = async function(tenantId: string, colName: string):Promise<any>{
    /**
     * @param schema is the document scheme for mongo usage
     * @param id is the unique identifier of the document
     * @param data is the new information for the object to be updated
     */
    return async function (schema: mongoose.Schema, id: string, data: object):Promise<any>{
        try {
            let db = await newMultiTenantConnection(tenantId);

            if (db === null) return null;

            let model = db.model(colName, schema);
            
            if (typeof model === 'undefined') return null;

            let document : any 
            
            document = model.findByIdAndUpdate(id, data);

            return document;
        } catch (error) {
            console.log(`[INSERT FAILED] \n ${error}`)
            return null
        }
    }
}