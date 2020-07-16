import './index.css';

import React,{useReducer} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Firebase, FirebaseContext } from './server/firebase'
import { StateContext } from './session/store';
import {initialState} from './session/initialState';
import sesionReducer from './session/sesionReducer';

export const Index = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()} >
      <StateContext.Provider value={useReducer(sesionReducer, initialState)} >
      <App />
    </StateContext.Provider>
    </FirebaseContext.Provider >
  )
}

ReactDOM.render(
  <Index />
  , document.getElementById('root')
);

/*  
 ReactDOM.render(
  <SessionProvider initialState={{}} reducer={mainReducer}>
    <Firebase3.Context.Provider value={new Firebase3()} >
      <App />
    </Firebase3.Context.Provider>
  </SessionProvider> //</SessionContext.Provider>
  , document.getElementById('root')
);
*/