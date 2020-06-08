import * as mongoose from "mongoose";
  
export const conceptoSchema = new mongoose.Schema({
    
    multitenant_key:{ 
        type: String , 
        required: true 
    },
    codigo:{//codigo del producto (unico)
        type: String, 
        required: false ,
        unique:true
    },
    referencia: {//referencia del producto
        type: String, 
        required: false,
        default:null
    },
    nombre: { 
        type: String, 
        required: true 
    },
    descripcion:{ 
        type: String, 
        required: true 
    },
    talla: { 
        type: String, 
        required: false ,
        default:null
    },
    color: { 
        type: String, 
        required: false ,
        default:null
    },
    descuento:{ 
        type: Number, 
        required: false ,
        default:null
    },
    serial_estatico: { 
        type: Number, 
        required: false ,
        default:null
    },
    serial_dinamico: { 
        type: Number, 
        required: false ,
        default:null
    },
    existencia_minima: { 
        type: Number, 
        required: false ,
        default:null
    },
    existencia_maxima: { 
        type: Number, 
        required: false ,
        default:null
    },
    tipos_conceptos_id: { 
        type: String, 
        required: true 
    },
    ubicacion_id: { 
        type: String , 
        required: false,
        default:null
    },
    costo: { 
        type: Number, 
        required: false ,
        default:null
    },
    ultimo_costo: { 
        type: Number, 
        required: false ,
        default:null
    },
    costo_mayor:{ 
        type: Number, 
        required: false ,
        default:null
    },
    costo_promedio: { 
        type: Number, 
        required: false ,
        default:null
    },
    grupos_id:{ 
        type: String ,
        required: true
    },
    subgrupos_id: { 
        type: String, 
        required: true 
    },
    unidades_id: { 
        type: String , 
        required: false,
        default:null
    },
    marcas_id: { 
        type: String, 
        required: false,
        default:null
    },
    estado: { 
        type: Number, 
        required: false ,
        default:null
    },
    pvp:{ 
        type: Number, 
        required: false ,
        default:null
    },
    precio_a:{ 
        type: Number, 
        required: true 
    },
    precion_b:{ 
        type: Number, 
        required: false,
        default:0
    },
    precio_dolar:{ 
        type: Number, 
        required: true 
    },
    utilidad:{ 
        type: Number, 
        required: false ,
        default:null
    },
    utiliad_a:{ 
        type: Number, 
        required: false ,
        default:null
    },
    utilidad_b:{ 
        type: Number, 
        required: false ,
        default:null
    },
    utilidad_c:{ 
        type: Number, 
        required: false ,
        default:null
    },
    utilidad_dolar:{ 
        type: Number, 
        required: false ,
        default:null
    },
    costo_dolar:{
        type: Number, 
        required: false ,
        default:null
    },
    precio_variante:{ 
        type: Number, 
        required: false ,
        default:null
    },
    retiene: { 
        type: Number, 
        required: false ,
        default:null
    },
    farm_principio_activo_id: { 
        type: Number, 
        required: false ,
        default:null
    },
    imagen:{ 
        type: String, 
        required: false,
        default:'default.png'
    },
    costo_adicional: { 
        type: Number,
        required: false ,
        default:null
    },
    costo_adicional2:{ 
        type: Number, 
        required: false ,
        default:null
    },
    cant_ensamblado:{ 
        type: Number, 
        required: false ,
        default:null
    },
    licor: { 
        type: Number, 
        required: false ,
        default:null
    },
    porcentaje:{ 
        type: Number, 
        required: false ,
        default:null
    },
    visible_pv: { 
        type: Number, 
        required: false ,
        default:null
    },
    visible_web:{ 
        type: Number, 
        required: false ,
        default:1
    },
    rest_areas_id: { 
        type: String, 
        required: false ,
        default:null
    },
    setcortesia: { 
        type: Number, 
        required: false ,
        default:null
    },
    exento: { 
        type: Number, 
        required: false ,
        default:null
    },
    merma: { 
        type: Number, 
        required: false ,
        default:null
    },
    exitencia_c: { 
        type: Number, 
        required: false ,
        default:null
    },
    obviar_ajuste: { 
        type: Number, 
        required: false ,
        default:null
    },
    iva:{ 
        type: Number, 
        required: false ,
        default:null
    },
},{
    timestamps:true
});
  
const model = mongoose.model("conceptos", conceptoSchema,"conceptos");

export default model;