import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Main from './pages/Main'
import Cadastro from './pages/Cadastro'
import Recupera from './pages/Recupera'

const Routs = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/home' component={Main} />
                <Route path='/cadastro' component={Cadastro} />
                <Route path='/recupera' component={Recupera} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routs