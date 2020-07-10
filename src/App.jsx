import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import RegistrarUsuario from './components/registrar_usuario';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/login';
import { Firebase2 } from './server/firebase2'
import { SessionContext } from './session/store';


function App() {

  const firebase = useContext(Firebase2.Context);  //instanciando un contexto
  const [firebaseIsReady, setFirebaseIsReady] = useState(false)

  const [{ openSnackbar }, dispatch] = useContext(SessionContext)

  useEffect(() => {
    firebase.isReady()
      .then(result => {
        console.log(':', result)
        setFirebaseIsReady(true)
      })
      .catch(error => console.log(error, "firebase no responde"))

  }, []);

  const handleClose = () => {
    dispatch({
      type: 'OPEN_SNACKBAR',
      mensaje: ''
    })
    openSnackbar.open = false;
    openSnackbar.mensaje = '';
  }

  return (
    firebaseIsReady ?
      <div className="App">
        <div >
          <span>{openSnackbar ? openSnackbar.mensaje : ''}</span>
          <button onClick={handleClose}></button>
        </div>
        <Router>
          <header>
            <Link to='/auth/registrar'
              onMouseEnter={() => console.log('enter:true')}
              onMouseLeave={() => console.log('leave:true')}>Registrar Usuario</Link>
            <Link to='/auth/login'>Login</Link>
            <button
              to='/'
              component={Link}>
              Home</button>
          </header>
          <Route path='/auth/registrar' exact component={RegistrarUsuario}></Route>
          <Route path='/auth/login' exact component={Login}></Route>
          <Route path='/' exact> <div>Home</div></Route>
        </Router>
      </div>
      : 'Esperando firebase'
  );
}

export default App;
