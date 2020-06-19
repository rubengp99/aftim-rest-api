import * as mongoose from "mongoose";
export const ITipoConceptosScheme = new mongoose.Schema({
    id: {
        type: String || Number,
        required: false,
    },
    nombre: {
        type: String,
        required: true,
        default: null
    }
})
export const ITipoCuentaScheme = new mongoose.Schema({
    id: {
        type: String || Number,
        required: false,
    },
    nombre: {
        type: String,
        required: true,
        default: null
    }
})
export const ITipoEstatusEnsambladoScheme = new mongoose.Schema({
    id: {
        type: String || Number,
        required: false,
    },
    nombre: {
        type: String,
        required: true,
        default: null
    }
})
export const ITipoMovimientoScheme = new mongoose.Schema({
    id: {
        type: String || Number,
        required: false,
    },
    nombre: {
        type: String,
        required: true,
        default: null
    }
})
export const TipoConceptosModel = mongoose.model("Tipo_conceptos", ITipoConceptosScheme, "Tipo_conceptos");
export const TipoCuentaModel = mongoose.model("Tipo_cuenta", ITipoCuentaScheme, "Tipo_cuenta");
export const TipoEstatusEnsambladoModel = mongoose.model("Tipo_Estatus_Ensamblado", ITipoEstatusEnsambladoScheme, "Tipo_Estatus_Ensamblado");
export const TipoMovimientoModel = mongoose.model("Tipo_Movimiento", ITipoMovimientoScheme, "Tipo_Movimiento");
