import * as mongoose from "mongoose";
export const bancoScheme = new mongoose.Schema({
    id: { 
        required: false, 
        type: String || Number,
     },
    cuenta: { 
        required: true, 
        type: String,
        default:false 
    },
    fecha_at: { 
        required: false, 
        type: String,
     },
    entidad_id: { 
        required: true, 
        type: String || Number,
        default:false 
    },
    fecha_apertura: { 
        required: true, 
        type: String,
        default:false
     },
    direccion: { 
        required: true, 
        type: String,
        default:false
     },
    telefono: { 
        required: true, 
        type: String,
        default:false
     },
    tipo_cuenta_id: { 
        required: true, 
        type: String || Number, 
        default:false
    },
    agencia: { 
        required: true, 
        type: String,
        default:false 
    },
    contacto: { 
        required: true, 
        type: String, 
        default:false
    },
    telefono_contacto: { 
        required: true, 
        type: String, 
        default:false
    },
    email_contacto: { 
        required: true, 
        type: String,
        default:false 
    },
    dias_diferidos: { 
        required: true, 
        type: Number,
        default:false
     },
    ult_saldo_conciliado: { 
        required: true, 
        type: Number,
        default:false
     },
    saldo_actual: { 
        required: true, 
        type: Number, 
        default:false
    },
    fecha_ult_conciliacion: { 
        required: true, 
        type: String, 
        default:false
    },
    pto_venta: { 
        required: true, 
        type: Number,
        default:false
     },
    comision: { 
        required: true, 
        type: Number,
        default:true
     }
})
const model = mongoose.model("banco", bancoScheme, "banco");
export default model;