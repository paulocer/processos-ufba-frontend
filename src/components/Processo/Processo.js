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
  PictureAsPdf as PictureAsPdfIcon,
  Print as PrintIcon,
  Email as EmailIcon,
} from '@material-ui/icons' 

import Popup from "reactjs-popup"
import useStyles from './style';
import api from '../../server/config'


export const Requerimento = {
  matricula: '', 
  objeto: '',
  outro: '',
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
          Data de Criação: {props.data}
        </Typography>
        <Typography className={classes.pos} color="black" gutterBottom>
          Tipo de Requerimento: {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Popup modal trigger={<Button size="small">Exportar</Button>}>
          <div style={{ display: "flex", flexWrap:"wrap", justifyContent: "space-evenly" }}>
            <p><Button>{<PrintIcon />}  Imprimir</Button></p>
            <p><Button>{<PictureAsPdfIcon />}  Gerar PDF</Button></p>
            <p><Button>{<EmailIcon />}  Receber por email</Button></p>
          </div>
        </Popup>
        <Link href="#" className={classes.link} style={{ color: "#000", textDecoration: "none" }}>
          <Button size="small">Editar</Button>
        </Link>
      </CardActions>
    </Card>
    <br />
  </>
  );
}