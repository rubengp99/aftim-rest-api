import * as mongoose from "mongoose";
const GaleriaScheme = new mongoose.Schema({
    id: { 
        type: String || Number, 
        required: false 
    },
    conceptos_id: { 
        type: String || Number, 
        required: true, 
        default: null 
    },
    imagen: { 
        type: String, 
        required: true, 
        default: null 
    },
})
const model = mongoose.model("galeria", GaleriaScheme, "galeria");
export default model;