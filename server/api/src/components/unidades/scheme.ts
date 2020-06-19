import * as mongoose from "mongoose";

export const unidadesSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:true,
    },
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("unidades", unidadesSchema, "unidades");

export default model;