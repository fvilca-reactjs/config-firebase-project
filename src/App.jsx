import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import RegistrarUsuario from './components/registrar_usuario';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/login';
import { Firebase2 } from './server/firebase2'
import { SessionContext } from './session/store';
import useSound from 'use-sound'
import soundBirds from './sounds/amb_city_birds.mp3'
import soundBeep from './sounds/ui_a.mp3'

function App() {

  const firebase = useContext(Firebase2.Context);  //instanciando un contexto
  const [firebaseIsReady, setFirebaseIsReady] = useState(false)
  const [{ openSnackbar }, dispatch] = useContext(SessionContext)

  const [play1] = useSound(soundBeep)
  const [play2] = useSound(soundBirds)

  useEffect(() => {
    firebase.isReady()
      .then(result => {
        console.log(':', result)
        setFirebaseIsReady(true)
      })
      .catch(error => console.log(error, "firebase no responde"))
  }, []);


  return (
    firebaseIsReady ?
      <div className="App">
        <div >
          <span>{openSnackbar ? openSnackbar.mensaje : ''}</span>
          x
        </div>
        <Router>
          <header>
            <Link to='/auth/registrar'
              onMouseEnter={() => { play1() }}
            >Registrar Usuario</Link>
            <Link to='/auth/login'
              onMouseEnter={() => { play1(); }}
            >Login</Link>
            <Link
              to='/'
            >
              Home</Link>
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
