//importação do mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//conectando ao banco de dados mongodb
mongoose.connect('mongodb+srv://adminjeff:quesenha@cluster0-rzdpd.mongodb.net/admin?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//mensagens de status da conecção do banco
mongoose.connection.on('connected', ()=>{
    console.log("banco conectado")
})
mongoose.connection.on('error', (err)=>{
    console.log("erro na conexão" + err)
})
mongoose.connection.on('disconnected', ()=>{
    console.log("banco desconectado :( ")
})