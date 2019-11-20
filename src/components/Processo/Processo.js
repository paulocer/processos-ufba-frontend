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


export const Requerimento = {
  matricula: '', 
  objeto: '',
  outro: '',
  data: '',
  esclarecimento: ''
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

  return (<>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Data: {props.data}
        </Typography>
        <Typography className={classes.pos} color="black" gutterBottom>
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
        <Link href="#" className={classes.link} style={{ color: "#000", textDecoration: "none" }}>
          <Button size="small">{<EditIcon />}Editar</Button>
        </Link>
        <Link href="#" className={classes.link} style={{ color: "#000", textDecoration: "none" }}>
          <Button size="small">{<FileCopyIcon />}Clonar</Button>
        </Link>
        <Link href="#" className={classes.link} style={{ color: "#000", textDecoration: "none" }}>
          <Button size="small">{<DeleteForeverIcon />}Excluir</Button>
        </Link>
        
      </CardActions>
    </Card>
    <br />
  </>
  );
}