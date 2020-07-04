import React from 'react';
import './App.scss';
import RegistrarUsuario from './components/registrar_usuario';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to='/auth/registrar'>Registrar Usuario</Link>
          <Link to='/auth/login'>Login</Link>
        </header>
        <Route path='/auth/registrar' exact component={RegistrarUsuario}></Route>
        <Route path='/auth/login' exact component={Login}></Route>

      </Router>
    </div>
  );
}

export default App;
