import * as mongoose from "mongoose";
export const IDescargo = new mongoose.Schema({
    id: {
        type: String || Number,
        required: false,
        default: null,
    },
    fecha_at: {
        type: String,
        required: true,
        default: null,
    },
    descripcion: {
        type: String,
        required: true,
        default: null,
    },
    tipo_descargo_id: {
        type: String || Number,
        required: true,
        default: null,
    },
    responsable: {
        type: String || Number,
        required: true,
        default: null,
    },
    autorizador: {
        type: String || Number,
        required: true,
        default: null,
    },
    detalles: []
});

export const IDetDescargo = new mongoose.Schema({
    id: {
         type: String || Number, 
         required: false, 
         default: null
         },
    enc_descargos_id: {
        type: String || Number,
        required: true,
        default: null,
    },
    conceptos_id: {
         type: String || Number,
          required: true, 
          default: null 
        },
    depositos_id: { 
        type: String || Number, 
        required: false, 
        default: null
     },
    existencia: { type: Number,
         required: false, 
         default: null 
        },
    descargo: { type: Number, 
        required: true, 
        default: null 
    },
});

const model = mongoose.model("descargo", IDescargo,"descargo");

export default model;
