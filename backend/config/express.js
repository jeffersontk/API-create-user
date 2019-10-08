//importação dos modulos utilizados
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser');
const path = require('path')

//exportando o express
module.exports = ()=>{
    const app = express();
    // definindo a porta a ser usada
    app.set('port', (process.env.PORT || 3001))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    consign({cwd: 'server'})
    .include('models')
    .include('controllers')
    .then('routes')

    .into(app)

    return app;
}