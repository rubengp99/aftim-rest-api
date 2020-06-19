import * as mongoose from "mongoose";

export const servicio_rutasSchema = new mongoose.Schema({

    descripcion:{
        type:String,
        required:true,
    },
    tarifa:{
        type:Number,
        required:true,
    },
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("servicio_rutas", servicio_rutasSchema, "servicio_rutas");

export default model;