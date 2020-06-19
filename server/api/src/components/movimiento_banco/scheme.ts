import * as mongoose from "mongoose";

export const MovBancoSchema = new mongoose.Schema({

    banco:{
        type: String,
        required: true,
    },
    tipo_movimiento:{
        type: Number,
        required: true
    },
    caja:{
        type: String,
        required: true,
    },
    tipo_pago:{
        type: String,
        required: true,
    },
    referencia:{
        type: String,
        required: false,
        default: ''
    },
    credito:{
        type: Number,
        required: false,
        default: 0
    },
    credito_dolar:{
        type: Number,
        required: false,
        default: 0
    },
    debito:{
        type: Number,
        required: false,
        default: 0
    },
    beneficiario:{
        type: String,
        required: true,
    },
    entidad:{
        type: String,
        required: true,
    },
    origen:{
        type: String,
        required: true,
    },
    documento:{
        type: String,
        required: true,
    },
    efectivo:{
        type: Number,
        required: false,
        default: 0
    },
    cheque:{
        type: Boolean,
        required: false,
        default: false,
    },
    mismo_banco:{
        type: Boolean,
        required: false,
        default: false,
    },
    islr:{
        type: Number,
        required: false,
        default: 0
    },
    comision:{
        type: Number,
        required: false,
        default: 0
    },
    conciliado:{
        type: Number,
        required: false,
        default: 0
    },
    islrnc:{
        type: Number,
        required: false,
        default: 0
    },
    riva:{
        type: Number,
        required: false,
        default: 0
    },
    estado:{
        type: Number,
        required: false,
        default: 0
    },
    imagen:{
        type: String,
        required: false,
        default: 'default.png'
    },
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("movimiento_banco", MovBancoSchema, "movimiento_banco");

export default model;