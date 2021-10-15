import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Routes from 'routes'
import useToggle from 'hooks/useToggle';
import { setUserAction } from 'redux/actions/userActions';
import { checkAuth } from 'services/authService';
import { UserProps } from 'utils/props/UserProps';
import "./App.css"


export const App = () => {
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

  return (
    <>
      {loading ?
        null :
        <Routes />
      }
    </>
  );
}

export default App;
