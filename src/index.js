import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Firebase3 } from './server/firebase2'
import { StateProvider } from './session/store';
import {initialState} from './session/initialState';
import { mainReducer } from './session'
import './index.css';


const firebase = new Firebase3();


export const Index = () => {
  return (
    <Firebase3.Context.Provider value={firebase} >
      <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider >
    </Firebase3.Context.Provider >
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