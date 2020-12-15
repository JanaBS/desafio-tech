const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db


//criando a centralização de dependencias através do consign dentro de .app
consign()
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend ok!')
})