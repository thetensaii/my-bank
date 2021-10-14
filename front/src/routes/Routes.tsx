import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from "pages/Home"
import { ProtectedRoute } from './components/ProtectedRoute'
import { PATHS } from './constants'
import Auth from 'pages/Auth'
export const Routes:React.FC = () => {
    return (
        <Router>
            <Switch>
                <ProtectedRoute path={PATHS.ROOT} exact component={Home}/>
                <Route path={PATHS.LOGIN} exact component={Auth} />
                <Route path={PATHS.SIGNUP} exact component={Auth} />
                <Redirect to={PATHS.ROOT} />
            </Switch>
        </Router>
    )
}
