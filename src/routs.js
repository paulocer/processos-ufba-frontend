import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history'
import Login from './pages/Login'
import Main from './pages/Main'
import Cadastro from './pages/Cadastro'
import Recupera from './pages/Recupera'

const Routs = () => {
    return (
        <Router history={history} >
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/home' component={Main} />
                <Route path='/cadastro' component={Cadastro} />
                <Route path='/recupera' component={Recupera} />
            </Switch>
        </Router>
    )
}

export default Routs