import React from 'react'
import { HomeView } from './HomeView'
import { userSelector } from 'redux/selectors/userSelectors'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { UserProps } from 'utils/props/UserProps'

export const HomeContainer = () => {
    const user: UserProps | null = useSelector(userSelector)
    const { pathname } = useLocation()

    const handleClick = () => {
        console.log(user)
    }

    return (
        <HomeView text={pathname} onClick={handleClick} />
    )
}
