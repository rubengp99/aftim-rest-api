import * as mongoose from "mongoose";

export const movInvSchema = new mongoose.Schema({

    concepto:{
        type: String,
        required: true
    },
    deposito:{
        type: String,
        required: true,
    },
    cantidad:{
        type: Number,
        required: true,
    },
    costo:{
        type: Number,
        required: true
    },
    costo_dolar:{
        type: Number,
        required: true
    },
    venta:{
        type: Number,
        required: true,
    }
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("movimiento_inventario", movInvSchema, "movimiento_inventario");

export default model;