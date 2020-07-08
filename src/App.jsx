import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import RegistrarUsuario from './components/registrar_usuario';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/login';
import { Firebase2 } from './server/firebase2'


function App() {

  const firebase = useContext(Firebase2.Context);  //instanciando un contexto
  const [firebaseIsReady, setFirebaseIsReady] = useState(false)

  useEffect(() => {
    firebase.isReady()
      .then(result => {
        console.log(':',result)
        setFirebaseIsReady(true)
      })
      .catch(error => console.log(error, "firebase no responde"))

  }, [])

  return (
    firebaseIsReady ?
      <div className="App">
        <Router>
          <header>
            <Link to='/auth/registrar'>Registrar Usuario</Link>
            <Link to='/auth/login'>Login</Link>
            <Link to='/'>Home</Link>
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
