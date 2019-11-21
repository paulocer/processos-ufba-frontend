import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';

import history from '../../history';
import useStyles from './style';
import Copyright from '../tail';
import api from '../../server/config'

export default function SignInSide() {
  const [validator, setValidator] = useState({matricula: false, password: false});
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
      
    const usuario = {} 

    for (let entry of formData.entries()) {
        usuario[entry[0]] = entry[1]
    }  

    try{
      //realizando um get para efetuar o login
      await api.post('/login', {matricula: usuario.matricula, password: usuario.password});
      //alert("Login efetuado com Sucesso!");
      history.push({
        pathname: '/home',
        state:{
            matricula: usuario.matricula
          }
      });
      
    }catch(err){
      alert(`Houve um erro ao efetuar o login`);
    }

  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro de Requerimentos
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <NumberFormat
              customInput={TextField}
              format="#########"

              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricula"
              label="Matrícula"
              name="matricula"
              autoComplete="matricula"
              autoFocus
              onChange={(event) => event.target.value && event.target.value.trim().length === 9 ? setValidator({...validator, matricula: true}) : setValidator({...validator, matricula: false}) }
            />
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => event.target.value ? setValidator({...validator, password: true}) : setValidator({...validator, password: false}) }
            />
           <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Mantenha-me conectado."
            /> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validator.matricula || !validator.password}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recupera" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cadastro" variant="body2">
                  {"Não tem cadastro? Cadastre-se!"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}