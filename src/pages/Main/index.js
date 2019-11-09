import React, { useState, useEffect } from 'react';

import api from '../../server/config'

import Li from '../../components/Li'

const Body = () => {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const getFilmes = async () => {
            const response = await api.get('/list');

            setFilmes(response.data)
        }
        getFilmes()
    }, []);

    return (
        <div>
            <p>Filmes</p>
            <ul>
                {filmes.map((element, index) => <Li key={index}>{element}</Li>)}
            </ul>
        </div>
    );
}

export default Body;