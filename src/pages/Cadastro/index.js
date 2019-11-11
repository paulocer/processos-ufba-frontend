import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MATC84 - DCC - UFBA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

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
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nomeCompleto"
                label="Nome Completo"
                name="nomeCompleto"
                autoComplete="nomeCompleto"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                autoComplete="matricula"
                name="matricula"
                variant="outlined"
                required
                fullWidth
                id="matricula"
                label="Nº Matrícula"
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="curso"
                label="Curso"
                id="curso"
                autoComplete="curso"
              />
            </Grid>
           <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="endreco"
                label="Endereço"
                name="endereco"
                autoComplete="endereco"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bairro"
                label="Bairro"
                name="bairro"
                autoComplete="bairro"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cep"
                label="CEP"
                name="cep"
                autoComplete="cep"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                autoComplete="telefone"
              />
            </Grid>
           <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                type="email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
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
                autoComplete="current-password"               />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirma
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já tem cadastro? Faça o login.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}