import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import history from '../../../history';
import useStyles from '../style'
import Copyright from '../../tail';
import api from '../../../server/config';

export default function Reset({match}) {
  const [validator, setValidator] = useState({field1: '', field2: '', field2pressed: false});
  const classes = useStyles();

  var hash = match.params.hash;

  // Método responsavel por validar se o token ainda é valido
  const validateLink = async () => {
    try{
      await api.get(`/recuperar/${hash}`);
      return;
    }catch(err){
      alert(`Houve um erro ao tentar alterar a sua senha, verifique se ela não foi alterada anteriormente`);
     history.push('/');
    } 
  }

  const validatePassword = (validator.field1 !== '' && validator.field2 !== '') && (validator.field1 === validator.field2);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try{
      // Altera a senha do usuário no banco
      await api.post(`/recuperar/${hash}`, {password: validator.field1});
      alert("Senha alterada com sucesso!");
      history.push('/');
      
    }catch(err){
      alert(`Houve um erro ao tentar alterar a sua senha, verifique se ela não foi alterada anteriormente`);
      history.push('/');
    } 

  }

  return (
    validateLink(),
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperação de Senha
        </Typography>
       
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField        
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="newPassword"
            label="Nova Senha"
            autoComplete="password"
            autoFocus
            onChange={(event) => setValidator({...validator, field1: event.target.value}) }
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="repeatPassword"
            label="Repita a Senha"
            onChange={(event) => setValidator({...validator, field2: event.target.value}) }
            onKeyDown={(event) => setValidator({...validator, field2pressed: true})}
          />
           <p style={{color: 'red', fontWeight: 'bold'}}>{(!validatePassword && validator.field2pressed )? '*As senhas não são iguais': ''}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validatePassword}
          >
            Alterar senha
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}