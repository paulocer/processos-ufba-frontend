import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link
} from '@material-ui/core'
import {
  PictureAsPdf,
  Print,
  Email
} from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';

import Popup from "reactjs-popup"
import useStyles from './style';
import api from '../../server/config'
import history from '../../history';


export const Requerimento = {
  matricula: '', 
  objeto: '',
  outro: '',
  data: '',
  esclarecimento: ''
}

async function removeRequerimento(id){
  if(window.confirm("Deseja realmente remover o requerimento")){
    try{
    await api.delete('/requerimento', {data: {id: id}});
      alert("O requerimento foi removido com sucesso");
      history.go(0);
    }catch(error){
      alert("Houve um erro ao tentar remover o requerimento");
    }
  }
}

function editRequerimento(id, inheritProps){
  inheritProps.location.state.idRequerimento = id;
  history.push({
    pathname: '/novorequerimento',
    state: inheritProps.location.state
  })


}

export async function getRequerimento(id){
  if(id){
    try{
      const response =  await api.post('/recupera/requerimento', {id: id});
      delete response.data.result._id;
      return response.data.result;
    }catch(error){
      return;
    }
  }

}


export async function getRequerimentos(matricula){
  if(matricula){
    try{
      const response =  await api.post('/requerimentos', {matricula: matricula});
      return response.data;

    }catch(error){
      return;
    }
  }
}

export default function SimpleCard(props) {
  const classes = useStyles();
  console.log(props);

  return (<>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Data: {props.data}
        </Typography>
        <Typography className={classes.pos} gutterBottom>
          Objeto do Requerimento: {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Popup modal trigger={<Button size="small">{<ShareIcon />}Compartilhar</Button>}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <p><Button>{<Print />}  Impressora</Button></p>
            <p><Button>{<PictureAsPdf />}  Gerar PDF</Button></p>
            <p><Button>{<Email />}  Enviar email</Button></p>
          </div>
        </Popup>
        
         <Button 
          size="small"         
          className={classes.link} 
          style={{ color: "#000", textDecoration: "none" }}
          onClick={(e) => {editRequerimento(props.id, props.inheritProps)}}>
          {<FileCopyIcon />}Clonar</Button>
          <Button 
          size="small"         
          className={classes.link} 
          style={{ color: "#000", textDecoration: "none" }}
          onClick={(e) => {removeRequerimento(props.id)}}>
          {<DeleteForeverIcon />}Excluir</Button>            
      </CardActions>
    </Card>
    <br />
  </>
  );
}