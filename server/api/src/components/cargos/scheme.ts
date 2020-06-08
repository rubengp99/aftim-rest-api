import * as mongoose from "mongoose";

export const CargosSchema = new mongoose.Schema({

    cantidad:{//cantidad agregada
        type:Number,
        required:true,
    },
    usuarios_id:{//index del usuario
        type: String, 
        required: true 
    },
    conceptos_id:{//index del concepto
        type: String, 
        required: true 
    },
    depositos_id:{//index del concepto
        type: String, 
        required: true 
    },
    multitenant_key:{//index de la instacia 
        type:String,
        required:true,
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("cargos", CargosSchema,"cargos");

export default model;