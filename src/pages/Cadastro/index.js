import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import {validate as emailValidate}  from 'email-validator';

import history from '../../history';
import Copyright from '../tail';
import useStyles from './style';
import api from '../../server/config'
import {Usuario, getUserLogged} from '../../components/Usuario/Usuario'

export default function SignUp(props) {
  var { state } = props.location;
  const classes = useStyles();  


  const [usuario, setUsuario] = useState({ ...Usuario});
  const [validator, setValidator] = useState({emailPressed: false, confirmPassword: '', confirmPasswordPressed: false });

  const validatePassword = (usuario.password !== '' && validator.confirmPassword !== '') && (usuario.password === validator.confirmPassword);

  const isUpdate = state && state.matricula && state.matricula !== '' ;
    useEffect(()=>{
      const getUsuario = async ()=> {
        const response = await getUserLogged(state.matricula)
        setUsuario(response)
    }
    if(isUpdate){
      getUsuario()
    }
  }, []);
  
  const validate = usuario && (usuario.nomeCompleto === '' || usuario.curso === '' || usuario.endereco ===  '' || usuario.bairro === '' || usuario.password === '' 
  || usuario.matricula.length < 9 || usuario.cep < 9 || usuario.celular < 15)
  
  //Efetua o cadastro realizando um post na api
   const handleSubmit = async (event) => {
    event.preventDefault();

    if(!isUpdate){
      // Cadastra um novo usuario
      try{
        //realiza o post
        await api.post('/cadastro', {usuario: usuario});
        alert("Cadastro realizado com Sucesso!");
        //retorna para a home
        history.push('/');
      }catch(err){
        alert(`Houve um erro ao efetuar o cadastro`);
      }       

    }else{
      //Atualiza usuário existente
      try{
          //realiza o put
          await api.put('/cadastro', {usuario: usuario});
          alert("Cadastro atualizado com Sucesso!");
          //retorna para a home
          history.push({
            pathname:'/home',
            state: state});
        }catch(err){
          alert(`Houve um erro ao atualizar o cadastro`);
        }   
    }  

  }

  const logIn = 
    <Grid container justify="flex-end">
      <Grid item>
        <Link href="/" variant="body2" >
          Já tem cadastro? Faça o login.
       </Link>
    </Grid>
  </Grid> ;

  const buttonVoltar = <Button          
  fullWidth
  variant="contained"
  color="primary"
  className={classes.submit}  
  onClick = {(e) => {history.go(-1)}}        
  >
  Voltar
    </Button>


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          CADASTRO DO ALUNO
        </Typography>
        <form className={classes.form} noValidate onSubmit= {handleSubmit}>
          <Grid container spacing={1}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {usuario.nomeCompleto}           
                id="nomeCompleto"
                label="Nome Completo"
                name="nomeCompleto"
                autoComplete="nomeCompleto"
                autoFocus
                onChange={(e) => setUsuario({...usuario, nomeCompleto: e.target.value}) }
                />
            </Grid>
            <Grid item xs={12} sm={3}>
            <NumberFormat
              customInput={TextField}
              format="#########"
              autoComplete="matricula"
              name="matricula"
              variant="outlined"
              disabled={isUpdate ? true : false}
              required
              fullWidth
              value={usuario.matricula}
              id="matricula"
              label="Nº Matrícula"
              onChange={(e) => setUsuario({...usuario, matricula: e.target.value}) }
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {usuario.curso}
                name="curso"
                label="Curso"
                id="curso"
                autoComplete="curso"
                onChange={(e) => setUsuario({...usuario, curso: e.target.value})}
              />
            </Grid>
           <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {usuario.endereco}
                id="endereco"
                label="Endereço"
                name="endereco"
                autoComplete="endereco"
                onChange={(e) => setUsuario({...usuario, endereco: e.target.value}) }
                />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {usuario.bairro}
                id="bairro"
                label="Bairro"
                name="bairro"
                autoComplete="bairro"
                onChange={(e) => setUsuario({...usuario, bairro: e.target.value}) }
              />
            </Grid>
            <Grid item xs={3}>
            <NumberFormat
              customInput={TextField}
              format="#####-###" mask="_"

                variant="outlined"
                required
                fullWidth
                value = {usuario.cep}
                id="cep"
                label="CEP"
                name="cep"
                autoComplete="cep"
                onChange={(e) => setUsuario({...usuario, cep: e.target.value}) }
              />
            </Grid>
            <Grid item xs={3}>
            <NumberFormat
              customInput={TextField}
              format="(##) #####-####" mask="_"

                variant="outlined"
                required
                fullWidth
                value = {usuario.celular}
                id="celular"
                label="Celular"
                name="celular"
                autoComplete="celular"
                onChange={(e) => setUsuario({...usuario, celular: e.target.value}) }
              />
            </Grid>
           <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {usuario.email}
                id="email"
                label="E-mail"
                type="email"
                name="email"
                autoComplete="email"
                onChange={(e) => setUsuario({...usuario, email: e.target.value}) }
                onKeyDown = {(e) => setValidator({...validator, emailPressed: true})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {usuario.password}
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setUsuario({...usuario, password: e.target.value}) }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmação de Senha"
                type="password"
                id="confirmPassword"
                autoComplete="current-password" 
                onChange={(e) => setValidator({...validator, confirmPassword: e.target.value}) }
                onKeyDown = {(e) => setValidator({...validator, confirmPasswordPressed: true})}
              />
            </Grid>
          </Grid>
          <p style={{color: 'red', fontWeight: 'bold'}}>{(!emailValidate(usuario.email) && validator.emailPressed )? '*E-mail inválido': ''}</p>
          <p style={{color: 'red', fontWeight: 'bold'}}>{(!validatePassword && validator.confirmPasswordPressed )? '*As senhas não são iguais': ''}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={validate || !validatePassword || !emailValidate(usuario.email)}
            >
            Confirma
          </Button>        
          {isUpdate? buttonVoltar: logIn}
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}