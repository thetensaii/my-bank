import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from "pages/Home"
import { AnonymousRoute } from './components/AnonymousRoute'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PATHS } from './constants'
import Auth from 'pages/Auth'
export const Routes:React.FC = () => {
    return (
        <Router>
            <Switch>
                <AnonymousRoute path={PATHS.LOGIN} exact component={Auth} />
                <AnonymousRoute path={PATHS.SIGNUP} exact component={Auth} />
                <ProtectedRoute path={PATHS.ROOT} exact component={Home}/>
                <Redirect to={PATHS.ROOT} />
            </Switch>
        </Router>
    )
}
