import * as mongoose from "mongoose";

export const ciudad = new mongoose.Schema({
    id: { type: String || Number },
    estado_id: { type: String || Number, require: true, default: false },
    nombre: { type: String, require: true, default: false }
})

const model = mongoose.model("compras", ciudad, "compras");
export default model;