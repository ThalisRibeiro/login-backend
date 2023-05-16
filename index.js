const { json } = require('express');

const app = require('express')();
const PORT = 8080;

let usuarios = [{}];
app.use(json())
// app.use(express.json())
app.listen(
    PORT,
    ()=> console.log('it s alive on http://localhost:'+PORT)
)
app.get('/test', (req,res)=>{
    res.status(200).json({
        valor: 200
    })
});

app.post('/criaconta',(req,res)=>{
    // console.log(req);
    const body = req.body;
    const {nome, email, senha} = req.body;
    console.log(body);
    if(email != undefined && senha != undefined){
        console.log(email+" "+senha);
        usuarios.push({
            nome, email, senha
        })
    }
    // res.status(200).send({})
    res.status(200).send({
        message: 'salvo',
        usuario: usuarios[usuarios.length - 1].nome,
        emailRecebido: usuarios[usuarios.length - 1].email,
        senhaRecebida: usuarios[usuarios.length - 1].senha
    }) 
})
app.get('/login', (req,res)=>{
    const {email, senha} = req.body;
    // value 0 = não existe, 1 encontrou, 2 senha errada
    let value = 0;    let status;    
    let message;    let index = 0;
    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].email != email)
            continue;
        if (usuarios[i].email == email 
            && usuarios[i].senha != senha) {
            value = 2;
            console.log("senha errada");
            break;
        }
        value = 1;
        index = i;
        break;
    }
    switch (value) {
        case 1:
            status = 200;
            message = "seja bem vindo "+usuarios[index].nome
            break;
        case 2:
            status = 230;
            message = "Senha errada"
            break;
        case 0:
            status = 231;
            message = "Usuario não encontrado"
            break;
        default:
            status = 232;
            message = "Erro"
            break;
    }
    res.status(status).send({
        message: message
    })
})
// const express = require('express')();
// const app = express();