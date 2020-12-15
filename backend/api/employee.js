const fs = require('fs')
let dia = new Date()
const path = '/Users/andrevitorino/Desktop/log.txt'

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator

    //recebendo as informações do frontend para validar e persistir no banco de dados
    const save = async (req, res) => {
        const employee = { ...req.body }
        if (req.params.id) employee.id = req.params.id

        //validando o preenchimento de todos os campos. Não existe a necessidade de validação no banco de dados, uma vez que todos os campos solicitados podem se repetir em outros usuários
        try {
            existsOrError(employee.nome, 'Nome não informado')
            existsOrError(employee.idade, 'Idade não informada')
            existsOrError(employee.cargo, 'Cargo não informado')
        }
        // lançando o erro caso caia em alguma das validações 
        catch (msg) {
            return res.status(400).send(msg)
        }

        //persistir no banco de dados para inserir ou editar os dados do funcionário

        if (employee.id) {

            const data = `${dia} - Alteração no usuário:\nNome: ${employee.nome}\nIdade: ${employee.idade}\nCargo: ${employee.cargo}\n\n`
            fs.appendFileSync(path, data, (err) => {
                if (err) throw err;
            });
            app.db('employee')
                .update(employee)
                .where({ id: employee.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            const data = `${dia} - Criação usuário:\nNome: ${employee.nome}\nIdade: ${employee.idade}\nCargo: ${employee.cargo}\n\n`
            fs.appendFileSync(path, data, (err) => {
                if (err) throw err;
            });
            app.db('employee')
                .insert(employee)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    //usada para a paginação
    const limit = 10
    //recuperando os dados já salvos no banco de dados
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('employee').count('id').first()
        const count = parseInt(result.count)
        app.db('employee')
            .select('id', 'nome', 'idade', 'cargo')
            .limit(limit).offset(page * limit - limit)
            .then(employee => res.json({ data: employee, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getBy = (req, res) => {
        const employee = { ...req.body }
        if (req.body.nome != '') {
          app.db('employee')
                .select('id', 'nome', 'idade', 'cargo')
                .then(resp => {res.json({ data: resp })})
                .catch(err => res.status(500).send(err))

        }
    }
    //removendo 
    const remove = async (req, res) => {
            
        const data = `${dia} - Exclusão de usuário\n\n`
            fs.appendFileSync(path, data, (err) => {
                if (err) throw err;
            });
        await app.db('employee')
            .where({ id: req.params.id }).del()
            .then(res.status(204).send())
    }


    return { save, get, remove, getBy }
}

