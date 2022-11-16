//Creacion de colecciones 
//Los Paneles

const mongoose = require('mongoose'); // Llamada a mongoose
const Schema = mongoose.Schema ;   //Creación del Schema

const PanelesSchema = new Schema ({
    id : Number,
    titulo : String,
    descripcion : String,
    //Todo mirar como relacionarlo 
    tareas : String,
    
})

//Crear modelo

const Panel = mongoose.model('Panel', PanelesSchema);

module.exports = Panel;