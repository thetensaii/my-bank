import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from 'redux/selectors/userSelectors'
import { UserProps } from 'utils/props/UserProps'
import { Redirect, Route, RouteProps } from 'react-router'
import { PATHS } from 'routes/constants'

export const ProtectedRoute: React.FC<RouteProps> = ({ ...props }) => {

    const user: UserProps | null = useSelector(userSelector);

    return (
        user ?
            <Route {...props} /> :
            <Redirect to={PATHS.LOGIN} />
    )
}
