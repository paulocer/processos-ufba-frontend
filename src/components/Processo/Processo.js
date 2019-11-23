import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import {
  PictureAsPdf
} from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {Link} from 'react-router-dom';
import {parseISO, format} from 'date-fns';
import has from 'lodash/has';

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

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Data: {has(props, 'data') && format(parseISO(props.data), "dd/MM/yyyy")}
          </Typography>
          <Typography className={classes.pos} gutterBottom>
            Objeto do Requerimento: {props.desc}
          </Typography>
        </CardContent>
        <CardActions>
            <Button 
              size="small"         
              className={classes.link} 
              style={{ color: "#000", textDecoration: "none" }}>
              <Link className={classes.link}
                style={{textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center'}}
                to={`/pdf/${props.inheritProps.location.state.matricula}/${props.id}`}
                target='_blank'>
                {<PictureAsPdf /> } Gerar PDF
              </Link>
            </Button>
            <Button 
              size="small"         
              className={classes.link} 
              style={{ color: "#000", textDecoration: "none" }}
              onClick={(e) => {editRequerimento(props.id, props.inheritProps)}}>
              {<FileCopyIcon /> } Clonar
            </Button>
            <Button 
              size="small"         
              className={classes.link} 
              style={{ color: "#000", textDecoration: "none" }}
              onClick={(e) => {removeRequerimento(props.id)}}>
              {<DeleteForeverIcon /> } Excluir
            </Button>            
        </CardActions>
      </Card>
      <br />
    </>
  );
}