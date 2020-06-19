import * as mongoose from "mongoose";
import { IDetCompras } from "./model";

export const IDetComprasScheme = new mongoose.Schema({
    id: {
        required: false,
        type: String || Number,
        default:null
    },
    adm_enc_compra_id: {
        required: false,
        type: String || Number,
        default:null
    },
    adm_depositos_id: {
        required: false,
        type: String || Number,
        default:null
    },
    adm_conceptos_id: {
        required: false,
        type: String || Number,
        default:null
    },
    costo: {
        required: false,
        type: String || Number,
        default:null
    },
    descuento: {
        required: false,
        type: String || Number,
        default:null
    },
    cantidad: {
        required: false,
        type: String || Number,
        default:null
    },
    iva: {
        required: false,
        type: String || Number,
        default:null
    },
    serial_inicial: {
        required: false,
        type: String,
        default:null
    },
    serial_final: {
        required: false,
        type: String,
        default:null
    }
})
export const ComprasScheme = new mongoose.Schema({
    id: {
        required: false,
        type: String || Number,
        default:null
    },
    numero_factura: {
        required: false,
        type: String || Number,
        default:null
    },
    adm_proveedor_id: {
        required: false,
        type: Number,
        default:null
    },
    adm_enc_orden_compra_id: {
        required: false,
        type: Number,
        default:null
    },
    adm_enc_recepcion_id: {
        required: false,
        type: Number,
        default:null
    },
    fecha_at: {
        required: false,
        type: String,
        default:null
    },
    numero_control: {
        required: false,
        type: String,
        default:null
    },
    fecha_in:
    {
        required: false,
        type: String,
        default:null
    },
    subtotal: {
        required: false,
        type: String || Number,
        default:null
    },
    subtotal_dolar: {
        required: false,
        type: String || Number,
        default:null
    },
    descuento: {
        required: false,
        type: String || Number,
        default:null
    },
    descuento_dolar: {
        required: false,
        type: String || Number,
        default:null
    },
    descuento_global: {
        required: false,
        type: String || Number,
        default:null
    },
    descuento_global_dolar: {
        required: false,
        type: String || Number,
        default:null
    },
    iva: {
        required: false,
        type: String || Number,
        default:null
    },
    retencion: {
        required: false,
        type: String || Number,
        default:null
    },
    abono: {
        required: false,
        type: String || Number,
        default:null
    },
    abono_dolar: {
        required: false,
        type: String || Number,
        default:null
    },
    status: {
        required: false,
        type: String || Number,
        default:null
    },
    observacion: {
        required: false,
        type: String,
        default:null
    },
    fecha_compra: {
        required: false,
        type: String,
    },
    riva: {
        required: false,
        type: String || Number,
        default:null
    },
    procesado: {
        required: false,
        type: String || Number,
        default:null
    },
    imagen: {
        required: false,
        type: String,
        default:null
    },
    detalles:  [IDetComprasScheme],
})

export const IDetComprasModel = mongoose.model("IDetCompras", IDetComprasScheme, "IDetCompras");
const model = mongoose.model("compras", ComprasScheme, "compras");

export default model;