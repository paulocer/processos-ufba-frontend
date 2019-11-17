import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        <Link href="#" className={classes.link} style={{color:"#000", textDecoration:"none"}}>
            <Button size="small">Exportar</Button>
        </Link>
        <Link href="#" className={classes.link} style={{color:"#000", textDecoration:"none"}}>
            <Button size="small">Editar</Button> 
        </Link>
      </CardActions>
    </Card>
    <br/>
    </>
  );
}