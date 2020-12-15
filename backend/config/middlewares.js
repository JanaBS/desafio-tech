//body parser será utilizado para a conversão das informações recebidas e enviadas nas requisições HTTP para o formato desejado (JSON, XML...)
const bodyParser = require('body-parser')
//utilizado para compartilhar a api entre outras aplicações, o front é considerado uma outra aplicação, pois ele roda em outra porta, por isso utilizaremos o cors
const cors = require('cors')

//centralizando as dependencias compartilhadas entre modulos através do consign
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}