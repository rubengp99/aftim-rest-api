import * as mongoose from "mongoose";

export const ClientesSchema = new mongoose.Schema({

    tenantId:{//index de la instacia 
        type:String,
        required:true,
    },
    nombre:{//cantidad agregada
        type:String,
        required:true,
    },
    nombre_comercial:{
        type:String,
        required:false,
        default:null
    },
    cedula:{
        type:String || Number,
        required:true,
    },
    fecha_nac:{
        type:Date,
        required:false,
        default:Date.now
    },
    tipo_estatus_id:{
        type:String ,
        required:false,
        default:null
    },
    telefono1:{
        type:String || Number,
        required:false,
        default:null
    },
    telefono2:{
        type:String || Number,
        required:false,
        default:null
    },
    telefono3:{
        type:String || Number,
        required:false,
        default:null
    },
    direccion:{
        type:String,
        required:false,
        default:null
    },
    direccion_fisica:{
        type:String,
        required:false,
        default:null
    },
    horario:{
        type:String,
        required:false,
        default:null
    },
    descuento:{
        type:Number,
        required:false,
        default:null
    },
    grupo_clientes_id:{
        type:String,
        required:false,
        default:null
    },
    tarifa:{
        type:Number,
        required:false,
        default:null
    },
    limite_credito:{
        type:Number,
        required:false,
        default:null
    },
    contribuyente:{
        type:String,
        required:false,
        default:null
    },
    cobrador_id:{
        type:String,
        required:false,
        default:null
    },
    vendedor_id:{
        type:String,
        required:false,
        default:null
    },
    zonas_id:{
        type:String,
        required:false,
        default:null
    },
    correo_electronico:{
        type:String,
        required:false,
        default:null
    },
    correo_electronico2:{
        type:String,
        required:false,
        default:null
    },
    paginaweb:{
        type:String,
        required:false,
        default:null
    },
    dias_credito:{
        type:Number,
        required:false,
        default:null
    },
    creditos:{
        type:Number,
        required:false,
        default:null
    },
    contacto:{
        type:String,
        required:false,
        default:null
    },
    telefono_contacto:{
        type:String,
        required:false,
        default:null
    },
    observacion:{
        type:String,
        required:false,
        default:null
    },
    estado_id:{
        type:String,
        required:false,
        default:null
    },
    ciudad_id:{
        type:String,
        required:false,
        default:null
    },
    empleado:{
        type:String,
        required:false,
        default:null
    }
    
},{//indica los valores de ultima actualizacion y creacion
    timestamps:true
});

const model = mongoose.model("clientes", ClientesSchema,"clientes");

export default model;