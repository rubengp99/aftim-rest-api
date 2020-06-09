import * as mongoose from "mongoose";
import {IDetDescargo} from "./model";

export const IDetDescargoSchema = new mongoose.Schema({
    id: {
         type: String || Number, 
         required: false, 
         default: null
         },
    enc_descargos_id: {
        type: String || Number,
        required: true,
    },
    conceptos_id: {
         type: String || Number,
          required: true
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
    },
});

export const IDescargoSchema = new mongoose.Schema({
    id: {
        type: String || Number,
        required: false,
        default: null,
    },
    fecha_at: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    tipo_descargo_id: {
        type: String || Number,
        required: true,
    },
    responsable: {
        type: String || Number,
        required: true,
    },
    autorizador: {
        type: String || Number,
        required: true,
    },

    detalles:[IDetDescargoSchema],

});

export const IDetDescargoModel = mongoose.model("IDetDescargo", IDetDescargoSchema,"IDetDescargo");
const model = mongoose.model("descargo", IDescargoSchema,"descargo");

export default model;
