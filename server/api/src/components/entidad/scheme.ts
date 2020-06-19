import * as mongoose from "mongoose";
const EntidadScheme = new mongoose.Schema({
    id:{
        type:String || Number,
        required:false,
        default:null
    },
    nombre:{
        type: String,
        required:true,
    }
})
const model =  mongoose.model("entidad", EntidadScheme, "entidad")
export default model;