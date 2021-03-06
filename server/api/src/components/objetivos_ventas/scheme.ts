import * as mongoose from "mongoose";
import { VendedorSchema } from "../vendedor/scheme"

export const objetivoSchema = new mongoose.Schema({

    tipo:{//cantidad agregada
        type:String,
        required:true,
    },
    responsable:{
        type: [VendedorSchema],
        required: true
    },
    meta:{
        type: Number,
        required: true,
    },
    moneda:{
        type: String,
        required: true,
    },
    limite:{
        type: String,
        required: true
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("objetivo", objetivoSchema, "objetivo");

export default model;