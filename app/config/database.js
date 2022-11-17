

const mongoose = require('mongoose')




const connection = 'mongodb+srv://JavaScript:uoc1234@producto2.prmbfgr.mongodb.net/test'

//Conexión con la base de datos
mongoose.connect(connection)
    .then(db => console.log('DB is connected'))