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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';

import history from '../../history';
import Copyright from '../tail';
import useStyles from './style';
import api from '../../server/config'


export default function NovoProcesso() {
  const classes = useStyles();

  const [validator, setValidator] = useState({
    objeto: false,
    outro: false,
    esclarecimentos: false
  });

  //Efetua o cadastro realizando um post na api
   const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
   const requerimento = {} 

   for (let entry of formData.entries()) {
      requerimento[entry[0]] = entry[1]
   }  
   try{
     //realiza o post
     await api.post('/requerimento', {requerimento: requerimento});
     alert("Requerimento realizado com Sucesso!");
     //retorna para a home
     history.push('/');
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
          <Grid container spacing={1}>
          <FormControl component="fieldset">
            <h2 component="legend">Objeto do Requerimento</h2>
            <RadioGroup defaultValue="Aproveitamento de estudos" aria-label="requerimento" name="customized-radios" onChange={(event) => event.target.value ? setValidator({...validator, objeto: true}) : setValidator({...validator, objeto: false}) }>
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
                  customInput={TextField}
                  format="#########"

                    autoComplete="outro"
                    name="outro"
                    variant="outlined"
                    required
                    fullWidth
                    id="outro"
                    label=""
                    onChange={(event) => event.target.value ? setValidator({...validator, outro: true}) : setValidator({...validator, outro: false}) }
                    />
            </Grid>
              
            </RadioGroup>
          </FormControl>
           
            <Grid item xs={6}>
            <h2 component="legend">Esclarecimentos</h2>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="esclarecimentos"
                label=""
                type="esclarecimentos"
                id="esclarecimentos"
                autoComplete="" 
                onChange={(event) => event.target.value ? setValidator({...validator, esclarecimentos: true}) : setValidator({...validator, esclarecimentos: false}) }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validator.esclarecimentos|| !validator.objeto}
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