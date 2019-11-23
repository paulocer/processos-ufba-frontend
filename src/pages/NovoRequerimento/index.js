import React, { useState, useEffect } from 'react'
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Box,
} from '@material-ui/core/'

import {
  Menu as MenuIcon,
  Add as AddIcon,
  History as HistoryIcon,
  ExitToApp as ExitToAppIcon,
  SettingsApplications as SettingsApplicationsIcon,
} from '@material-ui/icons/'
import {Link} from 'react-router-dom';
import get from 'lodash/get';

import Copyright from '../tail'
import useStyles from './style'
import {isUserLogged} from '../../components/Usuario/Usuario'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';

import history from '../../history';
import api from '../../server/config'
import {Requerimento, getRequerimento} from '../../components/Processo/Processo'

export default function NovoProcesso(props) {
  console.log(props);
  var { state } = props.location;
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen] = useState(false);
  
  // Verifica se o usuario está logado
  if(!isUserLogged(state)){
    // Usado para evitar erro ao tentar recuperar a matricula
    state = {matricula: ''};
  }
  
  const isUpdate = state && state.idRequerimento;

  const [requerimento, setRequerimento] = useState({ ...Requerimento, matricula: state.matricula });
  const validate = (requerimento.data === '' || requerimento.esclarecimento === '' || (requerimento.objeto ==='' && requerimento.outro === ''));

 
  useEffect(()=>{
    const getReq = async ()=> {
      const response = await getRequerimento(state.idRequerimento);
      setRequerimento(response)
  }
    if(isUpdate){
          getReq()
         delete state.idRequerimento;
      }
    }, [state.idRequerimento]); 
  
  // console.log(': ', requerimento);
    
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

  const icons = [<HistoryIcon />, <AddIcon />, <SettingsApplicationsIcon />, <ExitToAppIcon />]
  const caminho = [{ pathname: '/home', state: state }, { pathname: '/novorequerimento', state: state }, { pathname:'/cadastro', state: state }, { pathname:'/'}]

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['Requerimentos', 'Novo Requerimento', 'Alteração Cadastral', 'Sair'].map((text, index) => (
          //<Link href={index === 0 ? "#" : index === 1 ? "#" : index === 2 ? "#" : index === 3 ? "/" : index === 4 ? "/recupera" : "/cadastro"} className={classes.link}>
          <Link to={caminho[index]} className={classes.link} style={{ color: "#000", textDecoration: "none" }}>
            <ListItem button key={text}>
              {/* <ListItemIcon>{index === 0 ? <HomeIcon /> : index === 1 ? <HistoryIcon /> : index === 2 ? <AddIcon /> : <WarningIcon />}</ListItemIcon> */}
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            //onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            NOVO REQUERIMENTO
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            //onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <form className={classes.form} noValidate onSubmit= {handleSubmit}>
          <Grid container spacing={1}>
            
            <Grid item xs>
              <FormControl component="fieldset">
                <h2 component="legend">Objeto do Requerimento</h2>
                <RadioGroup aria-label="requerimento" name="customized-radios" onChange={(e) => (e.target.value === 'Outro' ? setRequerimento({...requerimento, objeto: e.target.value}) : setRequerimento({...requerimento, objeto: e.target.value, outro: ''}) )}>
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
                </RadioGroup>
                <TextField   
                  value = {requerimento.outro}
                  autoComplete="outro"
                  name="outro"
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows="2"
                  rowsMax="2"
                  id="outro"
                  label=""
                  disabled={get(requerimento, 'objeto', '') === 'Outro' ? false : true}
                  onChange={(e) => setRequerimento({...requerimento, outro: e.target.value}) }
                  />
              </FormControl>
            </Grid>
            
            
            <Grid item xs>
              <FormControl style={{width: '100%'}}>
                <h2 component="legend">Data</h2>
                <TextField
                  value = {requerimento.data}
                  id="date"
                  type="date"
                  className={classes.textField}            
                  InputLabelProps={{
                  shrink: true,
                  }}
                  onChange={(e) => setRequerimento({...requerimento, data: e.target.value}) }
                />
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
                  rows="13"
                  rowsMax="13"
                  autoComplete="" 
                  onChange={(e) => setRequerimento({...requerimento, esclarecimento: e.target.value}) }
                />
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
              </FormControl> 
            </Grid>
            
          </Grid> 
        </form>

      </main>
    </div>
  );
}