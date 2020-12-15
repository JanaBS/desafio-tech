//importando o arquivo de configuração do knex e instanciando o knex passando o arquivo de configuração para ele
const config = require('../knexfile.js')
const knex = require('knex')(config)

//comando de criação de tabela de forma automática no momento da execução do backend
knex.migrate.latest([config])
module.exports = knex