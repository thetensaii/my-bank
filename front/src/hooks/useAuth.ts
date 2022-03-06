import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import useToggle from 'hooks/useToggle';
import { checkUserAuthAction } from 'redux/actions/userActions';

const useAuth:() => boolean = () => {
    const [loading, toggleLoading] = useToggle(true);
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            await dispatch(checkUserAuthAction());
            toggleLoading()
        })()
    }, [dispatch, toggleLoading])

    return loading
} 

export default useAuth;