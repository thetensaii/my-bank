import useToggle from 'hooks/useToggle';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserAction, unsetUserAction } from 'redux/actions/userActions';
import Routes from 'routes'
import { checkAuth } from 'services/authService';
import { UserProps } from 'utils/props/UserProps';
import "./App.css"
export const App = () => {
  const [loading, toggleLoading] = useToggle(true);
  const dispatch = useDispatch()

  useEffect(() => {
    // changer de position surement
    (async () => {
      try {
        const user: UserProps = await checkAuth();
        // const user: UserProps = {
        //   id: 1,
        //   login: "gato",
        //   firstname: "gato",
        //   lastname: "gato",
        //   email: "gato@google.fr",
        //   created_at: new Date(),
        // }

        dispatch(setUserAction(user))
        toggleLoading()
      } catch (error) {
        dispatch(unsetUserAction())
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
