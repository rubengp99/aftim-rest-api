import * as mongoose from "mongoose";

export const DetalleFacturaSchema = new mongoose.Schema({

    concepto:{
        type: String,
        required: true,
    },
    vendedor:{
        type: String,
        required: true
    },
    costo:{
        type: Number,
        required: true,
    },
    costo_dolar:{
        type: Number,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    precio_dolar:{
        type: Number,
        required: true,
    },
    descuento:{
        type: Number,
        required: false,
        default: 0
    },
    cantidad:{
        type: Number,
        required: true,
    },
    despachado:{
        type: Boolean,
        required: false,
        default: true
    },
    devuelto:{
        type: Boolean,
        required: false,
        default: false,
    },
    lote:{
        type: Number,
        required: false,
        default: null
    },

},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const submodel = mongoose.model("detalles_fac", DetalleFacturaSchema, "detalles_fac")


export const FacturasSchema = new mongoose.Schema({

    numero_factura:{//cantidad agregada
        type: Number,
        required: true,
    },
    numero_fiscal:{
        type: Number,
        required: false,
        default: null,
    },
    serial_impresora:{
        type: String,
        required: false,
        default: ''
    },
    vendedor_id:{
        type: String,
        required: false,
        default: ''
    },
    clientes_id:{
        type: String,
        required: false,
        default: ''
    },
    subtotal:{
        type: Number,
        required: true,
    },
    subtotal_dolar:{
        type: Number,
        required: true,
    },
    iva:{
        type: Number,
        required: false,
        default: 0,
    },
    facturado:{
        type: Boolean,
        required: true,
    },
    estatus_pago:{
        type: Number,
        required: true,
    },
    abono:{
        type: Number,
        required: false,
        default: 0,
    },
    abono_dolar:{
        type: Number,
        required: false,
        default: 0
    },
    tipos_facturas:{
        type: Number,
        required: true
    },
    usuario:{
        type: Number,
        required: true,
    },
    caja:{
        type: Number,
        required: true,
    },
    observacion:{
        type: String,
        required: true,
    },
    usuario_modificador:{
        type: String,
        required: false,
        default: ''
    },
    rest_pedidos_id:{
        type: String,
        required: false,
        default: ''
    },
    estatus_entrega:{
        type: Number,
        required:false,
        default: null
    },
    detalles:{
        type: [submodel],
        required: true
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("facturas", FacturasSchema, "facturas");

export default model;