import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';

import history from '../../history';
import Copyright from '../tail';
import useStyles from './style';
import api from '../../server/config'
import {Requerimento} from '../../components/Processo/Processo'
import {isUserLogged} from '../../components/Usuario/Usuario'


export default function NovoProcesso(props) {  
  var { state } = props.location;  
  const classes = useStyles();  
  // Valida se o usuário está logado
  if(!isUserLogged(state)){
    // Usado para evitar erro ao tentar recuperar a matricula
    state = {matricula: ''};
  }

  const [requerimento, setRequerimento] = useState({ ...Requerimento, matricula: state.matricula });
  const validate = (requerimento.esclarecimento === '' || (requerimento.objeto ==='' && requerimento.outro === ''));

    
  //Efetua o cadastro realizando um post na api
   const handleSubmit = async (event) => {
    event.preventDefault();
    
   try{
     //realiza o post
     await api.post('/requerimento', {requerimento: requerimento});
     alert("Requerimento realizado com Sucesso!");
     //retorna para a home
     history.push({
       pathname:'/home',
       state: state});
   }catch(err){
      alert(`Houve um erro ao efetuar o cadastro do requerimento`);
   }       

  }

  // Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          NOVO REQUERIMENTO
        </Typography>
        <form className={classes.form} noValidate onSubmit= {handleSubmit}>
        <h2 component="legend">Data</h2>
          <TextField
            id="date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Grid container spacing={1}>
          <FormControl component="fieldset">
            <h2 component="legend">Objeto do Requerimento</h2>
            <RadioGroup defaultValue="Aproveitamento de estudos" aria-label="requerimento" name="customized-radios" onChange={(e) => setRequerimento({...requerimento, objeto: e.target.value}) }>
              <FormControlLabel value="Aproveitamento de estudos" control={<StyledRadio />} label="Aproveitamento de estudos" />
              <FormControlLabel value="Desistência definitiva de curso" control={<StyledRadio />} label="Desistência definitiva de curso" />
              <FormControlLabel value="Dilatação do prazo máximo para conclusão do curso" control={<StyledRadio />} label="Dilatação do prazo máximo para conclusão do curso" />
              <FormControlLabel value="Dispensa de pré-requisito" control={<StyledRadio />} label="Dispensa de pré-requisito" />
              <FormControlLabel value="Permanência no curso" control={<StyledRadio />} label="Permanência no curso" />
              <FormControlLabel value="Reconsideração de despacho/Recurso" control={<StyledRadio />} label="Reconsideração de despacho/Recurso" />
              <FormControlLabel value="Retificação de histórico" control={<StyledRadio />} label="Retificação de histórico" />
              <FormControlLabel value="Trancamento parcial de inscrição em disciplinas" control={<StyledRadio />} label="Trancamento parcial de inscrição em disciplinas" />
              <FormControlLabel value="Trancamento total de inscrição em disciplinas (semestre corrente)" control={<StyledRadio />} label="Trancamento total de inscrição em disciplinas (semestre corrente)" />
              <FormControlLabel value="Trancamento por tempo determinado" control={<StyledRadio />} label="Trancamento por tempo determinado" />
              <FormControlLabel value="Outro" control={<StyledRadio />} label="Outro" />
              <Grid item xs={6}>
                <TextField   
                    value = {requerimento.outro}
                    autoComplete="outro"
                    name="outro"
                    variant="outlined"
                    required
                    fullWidth
                    id="outro"
                    label=""
                    onChange={(e) => setRequerimento({...requerimento, outro: e.target.value}) }
                    />
            </Grid>
              
            </RadioGroup>
          </FormControl>
           
            <Grid item xs={6}>
            <h2 component="legend">Esclarecimentos</h2>
              <TextField
                value = {requerimento.esclarecimento}
                variant="outlined"
                required
                fullWidth
                name="esclarecimentos"
                label=""
                type="esclarecimentos"
                id="esclarecimentos"
                multiline
                autoComplete="" 
                onChange={(e) => setRequerimento({...requerimento, esclarecimento: e.target.value}) }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={validate}
            >
            Confirma
          </Button>
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}