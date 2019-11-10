import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';

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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(data:image/png;base64,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)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

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
            Cadastro de Processos
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricula"
              label="Matrícula"
              name="matricula"
              autoComplete="matricula"
              autoFocus
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
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/home" variant="body2">
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