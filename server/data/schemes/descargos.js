import {Schema,model} from 'mongoose' ;
var IDescargo = new Schema({
    "id":                String | Number,
    "fecha_at":           String,
    "descripcion":        String,
    "tipo_descargo_id":   String | Number,
    "responsable":        String | Number,
    "autorizador":        String | Number,
    "detalles":           IDetDescargo[{id:{type: Schema.Types.ObjectId, ref: "cupones"},codigo:String}]
})
var IDetDescargo = new Schema ({
    "id":                String | Number,
    "enc_descargos_id":   String | Number,
    "conceptos_id":       String | Number,
    "depositos_id":       String | Number,
    "existencia":         Number,
    "descargo":           Number
})
export default model("comidas", comidasSchema);