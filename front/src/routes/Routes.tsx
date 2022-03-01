import React from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Home from "pages/Home"
import { AnonymousRoute } from './components/AnonymousRoute'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PATHS } from './constants'
import Auth from 'pages/Auth'
import Account from 'pages/Account'
export const Routes:React.FC = () => {
    return (
        <Router>
            <Switch>
                <AnonymousRoute path={PATHS.LOGIN} exact component={Auth} />
                <AnonymousRoute path={PATHS.SIGNUP} exact component={Auth} />
                <ProtectedRoute path={PATHS.ROOT} exact component={Home}/>
                <ProtectedRoute path={PATHS.ACCOUNTS} exact component={Account}/>
                <ProtectedRoute path={PATHS.TRANSACTIONS} exact component={Home}/>
                <Redirect to={PATHS.ROOT} />
            </Switch>
        </Router>
    )
}
