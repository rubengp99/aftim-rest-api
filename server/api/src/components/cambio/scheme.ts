import * as mongoose from "mongoose";

export const CambioSchema = new mongoose.Schema({

    tasa:{//tasa de cambio en BS o $
        type:Number,
        required:true,
    },
    moneda:{//tipo de moneda
        type:String,
        required:true,
    },
    tenantId:{
        type:String,
        required:true,
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("cambio", CambioSchema,"cambio");

export default model;