
//Las Tareas

const mongoose = require('mongoose'); //Llamada a mongoose
const Schema = mongoose.Schema;      //Creación del Schema

const TareasSchema =  new Schema ({
    id :  Number,
    titulo : String,
    descripcion : String,
    fecha_inicio : {type : Date, default : Date.now},
    fecha_fin : {type : Date},
    estado : Boolean,
    panel : {type: mongoose.Types.ObjectId, ref:"Panel"},

});



const Tareas = mongoose.model('Tareas', TareasSchema);

module.exports = Tareas;