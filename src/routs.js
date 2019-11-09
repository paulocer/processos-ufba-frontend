import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Main from './pages/Main'

const Routs = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/home' component={Main} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routs