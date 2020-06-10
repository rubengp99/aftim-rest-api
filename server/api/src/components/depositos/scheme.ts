import * as mongoose from "mongoose";

export const DepositosSchema = new mongoose.Schema({

    tenantId:{//index de la instacia 
        type:String,
        required:true,
    },
    nombre:{//cantidad agregada
        type:String,
        required:true,
    },
    usuarios_id:{//index del usuario
        type: String, 
        required: true 
    },
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("depositos", DepositosSchema,"depositos");

export default model;