import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import useToggle from 'hooks/useToggle';
import { setUserAction } from 'redux/actions/userActions';
import { checkAuth } from 'services/authService';
import { UserProps } from 'utils/props/UserProps';

const useAuth = () => {
    const [loading, toggleLoading] = useToggle(true);
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            try {
                const user: UserProps = await checkAuth();
                dispatch(setUserAction(user))
                toggleLoading()
            } catch (error) {
                toggleLoading()
            }
        })()
    }, [dispatch])

    return [loading]
} 

export default useAuth;