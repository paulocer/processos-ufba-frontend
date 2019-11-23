import React, {useState, useEffect} from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import {parseISO, format} from 'date-fns';
import get from 'lodash/get';
import has from 'lodash/has';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import api from '../../server/config';

import layout from '../../components/Images/Requerimento.jpg';
import openSans from '../../components/Fonts/OpenSans-Regular.ttf';

// Register font
Font.register({ family: 'openSans', src: openSans });

// Create styles
const styles = StyleSheet.create({
  viewer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  page: {
    position: 'absolute',
    fontFamily: 'openSans',
    fontSize: 11,
  },
  sectionOne: {
    height: 126,
    marginTop: 110,
  },
  sectionTwo: {
    height: 105,
    marginTop: 10,
  },
  sectionThree: {
    height: 200,
    marginTop: 10,
  },
  sectionFour: {
    height: 45,
    marginTop: 72,
  },
  marginPage: {
    marginLeft: 62,
    marginRight: 43,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    height: 15,
  },
  box: {
    height: 8,
    width: 8,
    marginTop: 1,
  }
});

// Create Document Component
const MyDocument = (props) => {
  const [requerimento, setRequerimento] = useState({})
  const [aluno, setAluno] = useState({})

  useEffect(() => {
    /* Busca os dados do requerimento */
    const getRequerimento = async (id) => {
      if(id){
        try{
          const response =  await api.post('/recupera/requerimento', {id});
          delete response.data.result._id;
          setRequerimento(response.data.result);

        }catch(error){
          return;
        }
      }
    }
    getRequerimento(props.match.params.id);

    /* Busca os dados do usuário */
    const getUser = async (matricula) => {
      if(matricula){
        try{
          const response =  await api.post('/recupera/usuario', {matricula});
          delete response.data._id;
          setAluno(response.data);

        }catch(error){
          return;
        }
      }
    }
    getUser(props.match.params.matricula);
  }, []);

  const handleMatricula = (matricula) => {
    return matricula.substr(0, 8) + ' ' + matricula[8]
  }

  const handleCheckbox = (objeto, objetoRequerimento) => {
    if(objeto.includes(objetoRequerimento)) {
      return {backgroundColor: 'black'}
    }
  }

  return (
    <>
      {Object.keys(requerimento).length > 0 
        && Object.keys(aluno).length > 0 
        ? <PDFViewer style={styles.viewer}>
        <Document title='Requerimento CEAG'>
            <Page>
              <View style={styles.fullScreen}><Image src={layout} style={styles.fullScreen} /></View>
              <View style={[styles.fullScreen, styles.page]}>
                  <View style={[styles.sectionOne, styles.marginPage]}>
                    <Text style={[{marginTop: 5}, styles.textContainer]}>{get(aluno, 'nomeCompleto', '')}</Text>
                    <Text style={{marginTop: 10, marginLeft: 4, letterSpacing: 11}}>{handleMatricula(get(aluno, 'matricula', ''))}</Text>
                    <Text style={[{marginTop: 13}, styles.textContainer]}>{get(aluno, 'endereco', '')}</Text>
                    <View style={[{marginTop: 12}, styles.row]}>
                      <Text style={[{width: 79}, styles.textContainer]}>{get(aluno, 'bairro', '')}</Text>
                      <Text style={{width: 89, marginLeft: 4}}>{get(aluno, 'celular', '')}</Text>
                      <Text style={[{width: 191, marginLeft: 3}, styles.textContainer]}>{get(aluno, 'email', '')}</Text>
                      <Text style={{marginLeft: 4, letterSpacing: 7.7}}>{get(aluno, 'cep', '').replace("-", " ")}</Text>
                    </View>
                    <View style={[{marginTop: 11}, styles.row]}>
                      <Text style={[{width: 220}, styles.textContainer]}>{get(aluno, 'curso', '')}</Text>
                      <Text style={{marginLeft: 20}}>{has(requerimento, 'data') && format(parseISO(requerimento.data), "dd    MM    yy")}</Text>
                    </View>
                  </View>

                  <View style={[styles.sectionTwo, styles.marginPage, {paddingTop: 12}]}>
                    <View style={[{height: 10, marginLeft: 1}, styles.row]}>
                      <View style={[{marginLeft: 5}, styles.box, handleCheckbox(['Aproveitamento de estudos'], get(requerimento, 'objeto', ''))]} />
                      <View style={[{marginLeft: 240}, styles.box, handleCheckbox(['Reconsideração de despacho/Recurso'], get(requerimento, 'objeto', ''))]} />
                    </View>
                    <View style={[{height: 10, marginLeft: 1}, styles.row]}>
                      <View style={[{marginLeft: 5}, styles.box, handleCheckbox(['Desistência definitiva de curso'], get(requerimento, 'objeto', ''))]} />
                      <View style={[{marginLeft: 240}, styles.box, handleCheckbox(['Retificação de histórico'], get(requerimento, 'objeto', ''))]} />
                    </View>
                    <View style={[{height: 10, marginLeft: 1}, styles.row]}>
                      <View style={[{marginLeft: 5}, styles.box, handleCheckbox(['Dilatação do prazo máximo para conclusão do curso'], get(requerimento, 'objeto', ''))]} />
                      <View style={[{marginLeft: 240}, styles.box, handleCheckbox(['Trancamento parcial de inscrição em disciplinas', 'Trancamento total de inscrição em disciplinas (semestre corrente)', 'Trancamento por tempo determinado'], get(requerimento, 'objeto', ''))]} />
                    </View>
                    <View style={[{height: 10, marginLeft: 1}, styles.row]}>
                      <View style={[{marginLeft: 267}, styles.box, handleCheckbox(['Trancamento parcial de inscrição em disciplinas'], get(requerimento, 'objeto', ''))]} />
                    </View>
                    <View style={[{height: 10, marginLeft: 1}, styles.row]}>
                      <View style={[{marginLeft: 5}, styles.box, handleCheckbox(['Dispensa de pré-requisito'], get(requerimento, 'objeto', ''))]} />
                      <View style={[{marginLeft: 254}, styles.box, handleCheckbox(['Trancamento total de inscrição em disciplinas (semestre corrente)'], get(requerimento, 'objeto', ''))]} />
                    </View>
                    <View style={[{height: 10, marginLeft: 1}, styles.row]}>
                      <View style={[{marginLeft: 5}, styles.box, handleCheckbox(['Permanência no curso'], get(requerimento, 'objeto', ''))]} />
                      <View style={[{marginLeft: 254}, styles.box, handleCheckbox(['Trancamento por tempo determinado'], get(requerimento, 'objeto', ''))]} />
                    </View>

                    <View style={[{alignItems: 'flex-end', marginTop: 19}, styles.row]}>
                      <View style={[{marginLeft: 51}, styles.box, handleCheckbox(['Outro'], get(requerimento, 'objeto', ''))]} />
                      <Text style={[{marginLeft: 58, width: 370, fontSize: 10}, styles.textContainer]}>{get(requerimento, 'outro', '')}</Text>
                    </View>
                  </View>

                  <View style={[styles.sectionThree, styles.marginPage]}>
                    <Text style={{lineHeight: 1.51}}>{get(requerimento, 'esclarecimento', '')}</Text>
                  </View>

                  <View style={[styles.sectionFour, styles.marginPage]}>
                    <View style={[{marginTop: 3}, styles.row]}>
                      <Text style={[{width: 306}, styles.textContainer]}>{get(aluno, 'nomeCompleto', '')}</Text>
                      <Text style={{marginLeft: 7, letterSpacing: 12.9}}>{handleMatricula(get(aluno, 'matricula', ''))}</Text>
                    </View>
                    <View style={[{marginTop: 11}, styles.row]}>
                      <Text style={[{width: 373}, styles.textContainer]}>{get(requerimento, 'objeto', '') === 'Outro' ? get(requerimento, 'outro', '') : get(requerimento, 'objeto', '')}</Text>
                      <Text style={{marginLeft: 29}}>{has(requerimento, 'data') && format(parseISO(requerimento.data), "dd    MM    yy")}</Text>
                    </View>
                  </View>
              </View>
            </Page>
        </Document>
      </PDFViewer> : <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: 30}}>
        <CircularProgress />
        <Typography style={{marginTop: 30}}>Gerando PDF</Typography>
      </div>}
    </>
  )
};

export default MyDocument;
