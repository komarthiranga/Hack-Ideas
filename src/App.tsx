import './App.css';
import SignIn from './Pages/SignIn';
import { Routes , Route } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getEmployees } from './store/employess-slice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector( (state: any) => state.auth.authenticated )
  useEffect(() => {
    if(!isAuthenticated) {
      dispatch(getEmployees());
    }
  }, [isAuthenticated, dispatch])
  return (
    <Routes>
        <Route path="/" element={ <SignIn />}/>
    </Routes>
  );
}

export default App;
