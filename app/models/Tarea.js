
//Las Tareas

const mongoose = require('mongoose'); //Llamada a mongoose
const Schema = mongoose.Schema;      //Creación del Schema

const TareaSchema =  new Schema ({
    titulo : String,
    descripcion : String,
    fecha_inicio : {type : Date, default : Date.now},
    fecha_fin : {type : Date},
    estado : Boolean,
    panel : {type: mongoose.Types.ObjectId, ref:"Panel"},
});

const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = Tarea;
