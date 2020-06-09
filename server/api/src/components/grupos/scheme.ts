import * as mongoose from "mongoose";

export const GruposSchema = new mongoose.Schema({

    nombre:{//cantidad agregada
        type:String,
        required:true,
    },
    imagen:{
        type:String,
        required: false,
        default: "default_group.png"
    },
    visualizar:{
        type: Boolean,
        required: false,
        default: false
    },
    posicion:{
        type: Boolean,
        required: false,
        default: false,
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("grupos", GruposSchema, "grupos");

export default model;