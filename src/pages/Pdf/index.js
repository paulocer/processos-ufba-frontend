import React, {useState, useEffect} from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import api from '../../server/config'

// Create styles
const styles = StyleSheet.create({
  viewer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  page: {
    padding: 40,
    
  },
});

// Create Document Component
const MyDocument = (props) => {
  console.log(': ', props.match.params.id)

  useEffect(() => {
    const getRequerimento = async (id) => {
      if(id){
        try{
          const response =  await api.post('/recupera/requerimento', {id});
          delete response.data.result._id;
          console.log(': ', response.data.result);

        }catch(error){
          return;
        }
      }
    }
    // getRequerimento(props);
    
  }, []);

  
  return (
    <PDFViewer style={styles.viewer}>
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text>Processo</Text>
                </View>
            </Page>
        </Document>
    </PDFViewer>
  )
};

export default MyDocument;

