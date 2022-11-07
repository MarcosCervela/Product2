//Creacion de colecciones 
//Los Paneles

const mongoose = require('mongoose'); // Llamada a mongoose
const Schema = mongoose.Schema ;   //Creación del Schema

const PanelesSchema = new Schema ({
    id : {type : Number},
    titulo : String,
    descripcion : String,
    tareas : String
    
})

//Crear modelo

const Panel = mongoose.model('Panel', PanelesSchema);

module.exports = Panel;