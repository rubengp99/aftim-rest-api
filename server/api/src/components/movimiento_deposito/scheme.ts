import * as mongoose from "mongoose";

export const DepositMovSchema = new mongoose.Schema({

    deposito:{//cantidad agregada
        type:String,
        required:true,
    },
    concepto:{
        type:String,
        required:true,
    },
    existencia:{
        type: Number,
        required: true,
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("movimiento_deposito", DepositMovSchema, "movimiento_deposito");

export default model;