import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popup from "reactjs-popup";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';

import useStyles from './style';
import { Link } from '@material-ui/core';

export default function SimpleCard(props) {
  const classes = useStyles();

  return (<>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Data de Criação: {props.data}
        </Typography>
        <Typography className={classes.pos} color="black" gutterBottom>
          Descrição: {props.desc}
        </Typography>
      </CardContent>
      <CardActions>       
        <Popup modal trigger={<Button size="small">Exportar</Button>}>
          <p><Button>{<PrintIcon  />}Imprimir</Button></p>
          <p><Button>{<PictureAsPdfIcon />}  Gerar PDF</Button></p>
          <p><Button>{<EmailIcon  />}  Receber por email</Button></p>
        </Popup>        
        <Link href="#" className={classes.link} style={{color:"#000", textDecoration:"none"}}>
            <Button size="small">Editar</Button> 
        </Link>
      </CardActions>
    </Card>
    <br/>
    </>
  );
}