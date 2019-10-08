const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const modelUser = mongoose.model('user')

let userController = [];

userController.allUsers = (req, res)=>{
    modelUser.find()
    .then(results => res.json(results))
    .catch(err=> res.send(err))
}
module.exports = userController

userController.newUser = (req, res)=>{
    //checando se foi enviado usuario e senha para a função
    if(req.body.username && req.body.password){
        //checando se a senha 1 é a mesma da senha 2
        if(req.body.password2 && req.body.password === req.body.password){
            //busca se o usuario já existe
            modelUser.findOne({'username': req.body.username})
            //utilizando uma promise
            .then(user=>{
                if(user){
                    //se sim, mensagem indicará o resultado que já existe
                    res.json({success:false, massage: 'this username has no available'})
                }else{
                    //Utilizando o método hash do bcrypt, passamos a senha enviada
                    //no corpo da requisição e um número inteiro que será utilizado para “encriptar a senha”
                    bcrypt.hash(req.body.password, 10)
                    //Esse método é um promise que retorna a senha encriptada
                    .then(hash=>{
                        //criamos a variável encryptedPassword e guardamos
                        // nela o retorno da promise que, no caso, é a variável hash
                        let encryptedPassword = hash
                        //Abaixo nós criamos o objeto que representa o modelo de usuário,
                        // passando a senha encriptada para que seja salva no banco de dados
                        let newUser = new modelUser({
                            //atribuição dos valores dos campos no banco de dados
                            username: req.body.username,
                            password: encryptedPassword,
                            email: req.body.email,
                            isAdmin: req.body.isAdmin
                        })
                        //Metodo save() do mongoose para salvar no model, esse metodo é uma promise
                        newUser.save()
                        .then(()=>res.json({success:true, message:'user create with success', statusCode:201}))
                        .catch(()=>res.json({success: false, massage: err, statusCode:500}))
                    })
                    .catch(err => res.json({success: false, massage: err, statusCode:500}))
                }
            })
        }else{
            //mensagem caso as senhas 1 e 2 não conferam
            res.json({success: false, massage:"Passwords doesn't match", statusCode:400})
        }
    }else{
        //mensagem caso o username e a senha não confiram 
        res.json({success: false, massage:'username and Password fields are required', statusCode:400})
    }
}