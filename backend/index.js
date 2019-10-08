//importando o express do arquivo express da pasta config
const app = require('./config/express')();
//importando o banco de dados da pasta database da pasta config
require('./config/database')
// ouvindo a porta definida no express
app.listen(app.get('port'), ()=>{
    console.log('Servidor rodando na porta 3001...')
})