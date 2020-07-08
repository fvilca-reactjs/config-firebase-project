import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { Firebase2 } from './server/firebase2'
import { SessionProvider } from './session/store';
import initialState from './session/initialState'
import SessionReducer from './session/sessionReducer'


ReactDOM.render(
  <Firebase2.Context.Provider value={Firebase2.getInstance()} >
    <SessionProvider initialState={initialState} reducer={SessionReducer}>
      <App />
    </SessionProvider>
  </Firebase2.Context.Provider>
  , document.getElementById('root')
);

/*
import { Firebase, FirebaseContext } from './server/firebase'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App2/>
  </FirebaseContext.Provider>
  ,document.getElementById('root')
);*/
