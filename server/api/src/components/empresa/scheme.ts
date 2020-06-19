import * as mongoose from "mongoose";

export const EmpresaSchema = new mongoose.Schema({

    rif:{//rif de la empresa
        type:String,
        required:true,
        unique:true
    },
    nombre:{//nombre de la empresa
        type:String,
        required:true
    },
    razon_social:{
        type:String,
        required:false,
        default:null
    },
    direccion:{//direccion fisica del local o/u oficina
        type:String,
        required:true
    },
    telefono1:{//telefono de la empresa
        type:String,
        required:true
    },
    telefono2:{//telefono alternativo
        type:String,
        required:false,
        default:null
    },
    paginaweb:{//link a la pagina de la empresa (url)
        type:String,
        required:false,
        default:null
    },
    correo_electronico:{//correo de la empresa
        type:String,
        required:true
    },
    correo_electronico2:{//correo alternativo
        type:String,required:false,
        default:null
    },
    twitter:{//link al twitter (url)
        type:String,
        required:false,
        default:null
    },
    facebook:{//link al facebook(url)
        type:String,
        required:false,
        default:null
    },
    instagram:{//link al instagram (url)
        type:String,
        required:false,
        default:null
    },
    imagen:{//filename que indica la imagen de la empresa
        type: String, 
        required: false ,
        default:'default.png'
    },
    firma_digital:{
        type:String,
        required:false,
        default:null
    },
    licencia_licores:{
        type:Boolean,
        required:false,
        default:false
    },
    nota:{//pequeña descripcion o nota referente a la empresa
        type:String,
        required:false,
        default:null
    },
    modelo:{//va en relacion al modelo del erp 
        type:Number,
        required:false,
        default:1
    },
    serial_disk:{//ni idea de para que es (ojo)
        type:String,
        required:false,
        default:null
    },
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("empresa", EmpresaSchema,"empresa");

export default model;