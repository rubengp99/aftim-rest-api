import * as mongoose from "mongoose";

let Detalles = new mongoose.Schema({
    conceptos_id:{
        type: String, 
        required: true 
    },
    usuario_id:{
        type: String, 
        required: true 
    },
    cantidad:{
        type: String || Number, 
        required: true 
    },
    precio:{
        type: String || Number, 
        required: true 
    },
    estatus_id:{
        type: String, 
        required: true 
    },
    estado:{
        type: String, 
        required: true 
    },
    areas_id:{
        type: String, 
        required: false,
        default:null
    },
    motivo:{
        type: String, 
        required: false,
        default:null
    },
    autorizo:{
        type: Number, 
        required: false,
        default:null
    },
    impreso:{
        type: Number, 
        required: false,
        default:null
    },
    entrada:{
        type: Number, 
        required: false,
        default:null
    },
    cortesia:{
        type: Number, 
        required: false,
        default:null
    },
    Observacion:{
        type: String, 
        required: false,
        default:null
    },
    imagen:{ 
        type: String, 
        required: false ,
        default:'default.png'
    },
},{
    timestamps:true
});

export const PedidosSchema = new mongoose.Schema({
    tenantId:{ 
        type: String, 
        required: true 
    },
    estatus_id:{
        type: String, 
        required: true 
    },
    estado:{
        type: String, 
        required: true 
    },
    cant_personas:{
        type: Number || String, 
        required: false,
        default:1
    },
    usuario_id:{
        type: String, 
        required: true 
    },
    motivo:{
        type: String, 
        required: false,
        default:null
    },
    autorizo:{
        type: Number, 
        required: false,
        default:null
    },
    Observacion:{
        type: String, 
        required: false,
        default:null
    },
    clientes_id:{
        type: String, 
        required: false,
        default:null
    },
    facturas_id:{
        type: String, 
        required: false,
        default:null
    },
    detalles:{//hace referencia al schema de los detalles el cual es un array de objetos
        type: [Detalles],
        required: true
    },
    imagen:{ 
        type: String, 
        required: false ,
        default:'default.png'
    },
},{
    timestamps:true
});

const model = mongoose.model("pedidos", PedidosSchema,"pedidos");

export default model;