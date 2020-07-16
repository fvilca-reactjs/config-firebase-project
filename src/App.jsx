import React, { useEffect, useContext } from 'react';
import './App.scss';
import RegistrarUsuario from './components/registrar_usuario';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/login';
import { FirebaseContext } from './server/firebase'
import { StateContext } from './session/store';
import Navbar from './layout/navbar'
import ListaInmuebles from './pages/ListaInmuebles';
import Perfil from './pages/perfil';

function App() {

  // [state] ====>
  console.log('App:')
  let firebase = useContext(FirebaseContext);
  const [{ usuario },] = useContext(StateContext);
  console.log('\t usuario:', usuario)

  // =====> Methods
  /*
  useEffect(() => {
    firebase.isReady().then(val => {
      console.log('\t firebase:', firebase)
      console.log('\t val:', val)
      //setFirebaseIsReady(val);
      console.log(firebase.auth.currentUser)
    });


  }, []);
*/
  return (

    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact
          render={(props) => (
            firebase.auth.currentUser
              ? <ListaInmuebles {...props} />
              : <Redirect to='/auth/login/' />
          )} />
        <Route path='/auth/registrar' exact component={RegistrarUsuario} />
        <Route path='/auth/login' exact component={Login} />
        <Route path='/listainmuebles' exact component={ListaInmuebles} />
        <Route path='/auth/perfil' exact component={Perfil} />

      </Switch>
    </Router>
  );
}

export default (App);

//const [firebaseIsReady, setFirebaseIsReady] = useState(false)

/*firebase.db.collection('Users')
        .doc(firebase.auth.currentUser.uid)
        .get()
        .then(doc => { console.log("response:", doc.data()) })*/

        //{sesion.autenticado && firebase.auth.currentUser.displayName, firebase.auth.currentUser.email}
/*
*/