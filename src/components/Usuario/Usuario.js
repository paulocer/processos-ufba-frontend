import history from '../../history';    
import api from '../../server/config'

export const Usuario = {
    nomeCompleto: '',
    matricula: '',
    curso: '',
    endereco: '',
    bairro: '',
    cep: '',
    celular: '',
    email: '',
    password: ''
}



export async function getUserLogged(matricula){
    if(matricula){
        const response =  await api.post('/usuario', {matricula: matricula});
        return response.data;
    }
}

export function isUserLogged(state){
    if(!state || !state.matricula ||state.matricula === ''){
        alert('É necessário fazer login para continuar');   
        history.push('/')
        return false;    
    }
    return true;
}

