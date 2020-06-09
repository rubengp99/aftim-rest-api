import * as mongoose from "mongoose";
export const areas_atencionScheme = new mongoose.Schema({
    id:{
        required:false,        
        type:String || Number,
    },
    nombre: {
        required:true,
        default:false,    
        type:String
    },
    impresora:{
        required:false, 
        type:String
    }
})
const model = mongoose.model("areas_atencion", areas_atencionScheme, "areas_atencion");
export default model;