import * as mongoose from "mongoose";

export const usuarioSchema = new mongoose.Schema({

    nombre:{//cantidad agregada
        type:String,
        required:true,
    },
    apellido:{//cantidad agregada
        type:String,
        required:true,
    },
    login:{//cantidad agregada
        type:String,
        required:true,
    },
    imagen:{
        type:String,
        required: false,
        default: "user.png"
    },
    password:{//cantidad agregada
        type:String,
        required:true,
    },
    email:{//cantidad agregada
        type:String,
        required:true,
    },
    fecha_nac:{//cantidad agregada
        type:String,
        required:true,
    },
    telefono:{//cantidad agregada
        type:String,
        required:true,
    },
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("usuario", usuarioSchema, "usuario");

export default model;