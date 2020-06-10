import * as mongoose from "mongoose";

export const SubGruposSchema = new mongoose.Schema({

    nombre:{//cantidad agregada
        type:String,
        required:true,
    },
    imagen:{
        type:String,
        required: false,
        default: "default_group.png"
    },
    grupoId:{
        type: Boolean,
        required: false,
        default: false
    },
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("subgrupos", SubGruposSchema, "subgrupos");

export default model;