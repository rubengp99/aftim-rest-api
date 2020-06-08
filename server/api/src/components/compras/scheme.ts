import * as mongoose from "mongoose";

export const Compras = new mongoose.Schema({
    id: {
        required: false,
        type: String || Number,
    },
    numero_factura: {
        required: false,
        type: String || Number,
    },
    adm_proveedor_id: {
        required: false,
        type: Number,
    },
    adm_enc_orden_compra_id: {
        required:false,
        type: Number,
    },
    adm_enc_recepcion_id: {
        required: false,
        type: Number,
    },
    fecha_at: {
        required: false,
        type: String,
    },
    numero_control: {
        required: false,
        type: String,
    },
    fecha_in:
    {
        required: false,
        type: String,
    },
    subtotal: {
        required: false,
        type: String || Number,
    },
    subtotal_dolar: {
        required: false,
        type: String || Number,
    },
    descuento: {
        required: false,
        type: String || Number,
    },
    descuento_dolar: {
        required: false,
        type: String || Number,
    },
    descuento_global: {
        required: false,
        type: String || Number,
    },
    descuento_global_dolar: {
        required: false,
        type: String || Number,
    },
    iva: {
        required: false,
        type: String || Number,
    },
    retencion: {
        required: false,
        type: String || Number,
    },
    abono: {
        required: false,
        type: String || Number,
    },
    abono_dolar: {
        required: false,
        type: String || Number,
    },
    status: {
        required: false,
        type: String || Number,
    },
    observacion: {
        required: false,
        type: String,
    },
    fecha_compra: {
        required: false,
        type: String,
    },
    riva: {
        required: false,
        type: String || Number,
    },
    procesado: {
        required: false,
        type: String || Number,
    },
    imagen: {
        required: false,
        type: String,
    },
    detalles: []
})

export const IDetCompras = new mongoose.Schema({
    id: {
        required: false,
        type: String || Number,
    },
    adm_enc_compra_id: {
        required: false,
        type: String || Number
    },
    adm_depositos_id: {
        required: false,
        type: String || Number
    },
    adm_conceptos_id: {
        required: false,
        type: String || Number,
    },
    costo: {
        required: false,
        type: String || Number,
    },
    descuento: {
        required: false,
        type: String || Number,
    },
    cantidad: {
        required: false,
        type: String || Number,
    },
    iva: {
        required: false,
        type: String || Number,
    },
    serial_inicial: {
        required: false,
        type: String,
    },
    serial_final: {
        required: false,
        type: String,
    }})
    const model = mongoose.model("compras",Compras,"compras");

    export default model;