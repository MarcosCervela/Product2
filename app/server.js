const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://JavaScript:uoc1234@producto2.prmbfgr.mongodb.net/test'


mongoose.connect(connectionString)

    .then(() => {
        console.log('Database conected')
    }).catch(err => {
        console.error(err)

    })