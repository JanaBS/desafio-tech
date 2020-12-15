// POST, GET, PUT, DELETE
//rotas dos métodos
module.exports = app => {
    app.route('/employee')
        .post(app.api.employee.save)
        .get(app.api.employee.get)
        
    app.route('/filter')   
        .get(app.api.employee.getBy)

    app.route('/employee/:id')
        .put(app.api.employee.save)
        .delete(app.api.employee.remove)
}