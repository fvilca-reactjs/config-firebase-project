import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import RegistrarUsuario from './components/registrar_usuario';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/login';
import { Firebase3 } from './server/firebase2'
import { useStateValue } from './session/store';

import Navbar from './layout/navbar'
//import { openMensajePantalla } from './session/snackbarAction';
import ListaInmuebles from './pages/ListaInmuebles';


function App(props) {

  // [state] ====>
  let firebase = useContext(Firebase3.Context);
  //const [firebaseIsReady, setFirebaseIsReady] = useState(false)
  const [{ autenticado, usuario }, ] = useStateValue();
  console.log('autenticado:', autenticado)
  console.log('usuario:', usuario)
  

  // =====> Methods
  useEffect(() => {
    firebase.isReady().then(val => {
      console.log('firebase:', firebase)
      console.log('val:', val)
      //setFirebaseIsReady(val);

    });


  }, []);
  //{sesion.autenticado && firebase.auth.currentUser.displayName, firebase.auth.currentUser.email}
  /*
  */
  return (

    <Router>
      <Switch>
        {!autenticado &&<Navbar />
        }
        <Route path='/auth/registrar' exact component={RegistrarUsuario} />
        <Route path='/auth/login' exact component={Login} />
        <Route path='/listainmuebles' exact component={ListaInmuebles} />
        <Route path='/' exact
          render={() => (
            autenticado || firebase.auth.currentUser
              ? <Redirect to='/listainmuebles' />
              : <Redirect to='/auth/login' />
          )} />
      </Switch>
    </Router>
  );
}

export default (App);

/*firebase.db.collection('Users')
        .doc(firebase.auth.currentUser.uid)
        .get()
        .then(doc => { console.log("response:", doc.data()) })*/