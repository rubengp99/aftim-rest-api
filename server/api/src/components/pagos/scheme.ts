import * as mongoose from "mongoose";

export const pagoSchema = new mongoose.Schema({

    emisor:{//cantidad agregada
        type:String,
        required:true,
    },
    receptor:{//cantidad agregada
        type:String,
        required:true,
    },
    adm_pedidos_id:{
        type: Number,
        required: true,
    },
    adm_tipo_pago_id:{
        type: Number,
        required: true,
    },
    adm_status_id:{
        type: Number,
        required: true,
    },
    monto:{
        type: Number,
        required: true,
    },
    codigo_referencia:{//cantidad agregada
        type:String,
        required:true,
    },
    imagen:{//cantidad agregada
        type:String,
        required:true,
    },
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("pago", pagoSchema, "pago");

export default model;