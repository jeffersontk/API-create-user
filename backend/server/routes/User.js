const userController = require('../controllers/User')

module.exports = (app)=>{
    //criando as rotas de users
    app.route('/v1/users')
    .get(userController.allUsers)
    .post(userController.newUser)
}