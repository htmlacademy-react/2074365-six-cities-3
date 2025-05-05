import {router} from '@/services/router';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {useEffect} from 'react';
import {checkAuthAction} from '@/store/api-actions.ts';
import {RouterProvider} from 'react-router-dom';
import {getAuthorizationStatus} from '@/store/user-process/user-process.selectors.ts';
import SpinnerComponent from 'components/spinner/spinner-component.tsx';
import {AuthorizationStatus} from '@/constants/constants.ts';

function App() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <SpinnerComponent/>;
  }

  return <RouterProvider router={router}/>;
}

export default App;
