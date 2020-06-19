import * as mongoose from "mongoose";
const marcasScheme = new mongoose.Schema({
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
const model =  mongoose.model("marcas", marcasScheme, "marcas")
export default model;