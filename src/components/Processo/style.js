import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 15,
    },
    pos: {
      marginBottom: 10,
    },
  });
  
  export default useStyles;