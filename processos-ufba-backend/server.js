const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const enviarEmail = require("./email");
const uri ="mongodb+srv://acessobanco:YPJwWjRa4tgynAkX@processosufba-u7vte.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('processosufba');

})

// Gera um token utilizado na geração de link para recuperar a senha.
async function gerarHash (db, usuario) {   
    const hashCode =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    db.collection('recovery').save({matricula: usuario.matricula, hash: hashCode}, (err, result)=>{
        if (err) return;
        enviarEmail(usuario, hashCode);        
    });

}

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello ' })
});

// Rota utilizada para realizar o cadastro do usuário
app.post('/cadastro', (req, res) => {
    db.collection('user').save(req.body.usuario, (err, result) => {
        if (err) return res.status(500).send('Ocorreu um erro');
        res.send('Salvo no Banco de Dados');
        console.log('Salvo no Banco de Dados');
    });
});

// Rota utilizada para atualizar os dados do usuário no banco
app.put('/cadastro', (req, res) => {
    console.log(req.body);
    db.collection('user').updateOne({matricula: req.body.usuario.matricula},{$set: req.body.usuario}, (err, result) => {
        if (err) {console.log(err); return res.status(500).send('Ocorreu um erro');}
        res.send('Salvo no Banco de Dados');
        console.log('Salvo no Banco de Dados');
    });
});

// Rota utilizada para recuperar um usuario do banco
app.post('/recupera/usuario',(req, res)=>{
    db.collection('user').findOne({matricula: req.body.matricula},(err, result)=>{
        if (err)return res.status(500).send('Ocorreu um erro'); 
        if(result) {
            delete result._id;
            console.log(result);
          return  res.send({...result, password: ''});
        }else{
          return res.status(404).send('Não encontrado');
        }
    }); 
});

// Rota utilizada para realizar o login do usuário
app.post('/login', (req, res)=>{
    db.collection('user').findOne({matricula: req.body.matricula, password: req.body.password}, (err, result)=>{
        if (err)return res.status(500).send('Ocorreu um erro'); 
        if(result) {
          return  res.send("Ok");
        }else{
          return res.status(404).send('Não encontrado');
        }
    }); 

});

// Rota utilizada para recuperação de senha do usuário
app.get('/recuperar/matricula/:matricula',(req, res)=>{
    db.collection('user').findOne({matricula: req.params.matricula}, (err, result)=>{
        if (err) return res.status(500).send('Ocorreu um erro');
        if(result) {        
            gerarHash(db, result);
            return res.send("Ok");            
        }else {
            return res.status(404).send('Não encontrado');
        }
        
    });
});


// Rota utilizada para validar se o token ainda é valido
app.get('/recuperar/:hash', (req, res)=>{
    db.collection('recovery').findOne({hash: req.params.hash},(err, result) => {
        if (err) return res.status(500).send('Ocorreu um erro');
        if(result){
            return res.send("Ok");
        }else{
            return res.status(404).send("Não encontrado");
        }   
    })
});

// Rota utilizada na recuperação de senha do usuário
// Altera a senha no banco e apaga o token criado criado.
app.post('/recuperar/:hash', (req, res)=>{
    db.collection('recovery').findOne({hash: req.params.hash},(err, result) => {
        if (err) return res.status(500).send('Ocorreu um erro ');
        if(result){
            db.collection('user').updateOne({matricula: result.matricula},{$set: {password: req.body.password}} ,(err, result)=>{
                if (err) return res.status(500).send('Ocorreu um erro ');
                if(result) {
                    db.collection('recovery').deleteOne({hash: req.params.hash}, (err, result)=>{
                        if (err) return res.status(500).send('Ocorreu um erro ');
                        if(result) return res.send('OK')
                        else return res.status(500).send('Ocorreu um erro ');           
                    })
                } else {
                    return res.status(500).send('Ocorreu um erro ');
                }            
            })            
        }else{
            return res.status(500).send('Ocorreu um erro ');
        }   
        
    })
});

// Adiciona um requerimento
app.post('/requerimento', (req, res)=>{
    console.log(req.body);
    db.collection('requerimento').save(req.body.requerimento, (err, result) => {
        if (err) return res.status(500).send('Ocorreu um erro');
        res.send('Salvo no Banco de Dados');
        console.log('Salvo no Banco de Dados')
    });
});

//Altera um requerimento
app.put('/requerimento', (req, res) => {
    db.collection('requerimento').updateOne({_id: req.body.requerimento._id}, req.body.requerimento, (err, result) => {
        if (err) return res.status(500).send('Ocorreu um erro');
        res.send('Salvo no Banco de Dados');
        console.log(req.body.requerimento);
        console.log('Salvo no Banco de Dados');
    });
});


// Apaga um requerimento
app.delete('/requerimento', (req, res) => {
    db.collection('requerimento').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, (err, result) => {
        if (err) return res.status(500).send('Ocorreu um erro');
        res.send('Salvo no Banco de Dados');
        console.log('Salvo no Banco de Dados');
    });
});

//Recupera um requerimento pelo seu id
app.post('/recupera/requerimento',(req, res)=>{
    db.collection('requerimento').findOne({_id:new mongodb.ObjectID(req.body.id)},(err, result)=>{
        if (err) {console.log(err); return res.status(500).send('Ocorreu um erro')}; 
        if(result) {
            console.log("recuperar",result);
          return  res.send({result});
        }else{
          return res.status(404).send('Não encontrado');
        }
    }); 
});


// Recupera todos os requerimentos do usuario
app.post('/requerimentos', (req, res)=>{
    console.log(req);
    db.collection('requerimento').find({matricula: req.body.matricula}).toArray((err, result)=>{
        if (err) return res.status(500).send('Ocorreu um erro');
        if(result) {
            console.log(result);
          return  res.send(result);
        }else{
          return res.status(404).send('Não encontrado');
        }
    }); 
});


var port = process.env.PORT || 5000;
// set port
app.listen(port, function () {
console.log(`Node app is running on port ${port}`);
});
 


module.exports = app;