import {router} from '@/services/router';
import {useAppDispatch} from '@/hooks';
import {useEffect} from 'react';
import {checkAuthAction} from '@/store/api-actions.ts';
import {RouterProvider} from 'react-router-dom';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return <RouterProvider router={router}/>;
}

export default App;
