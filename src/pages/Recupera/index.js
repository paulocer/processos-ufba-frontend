import React, { useState } from 'react';
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
import history from '../../history';
import useStyles from './style'
import Copyright from '../tail';
import api from '../../server/config';

export default function SignIn() {
  const [validator, setValidator] = useState({matricula: false});
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
      await api.get(`/recuperar/matricula/${usuario.matricula}`);
      alert("Um e-mail foi enviado para a recuperação da senha!");
      history.push('/');
      
    }catch(err){
      alert(`Houve um erro tentar recuperar a senha, verifique se sua matricula está correta`);
    }
  }

  return (
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validator.matricula}
          >
            Recuperar senha
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                {"Voltar"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}