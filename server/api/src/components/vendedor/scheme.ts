import * as mongoose from "mongoose";

export const VendedorSchema = new mongoose.Schema({

    nombre:{//cantidad agregada
        type:String,
        required:true,
    },
    imagen:{
        type:String,
        required: false,
        default: "default_vendedor.png"
    },
    porcentaje:{
        type: Number,
        required: false,
        default: 0
    },
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("vendedor", VendedorSchema, "vendedor");

export default model;