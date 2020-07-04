import React, {createContext} from 'react'
import app from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBIUiyIy68c1Xfbg3IuAPMgZJgcBeZXPDU",
    authDomain: "yamaya-app.firebaseapp.com",
    databaseURL: "https://yamaya-app.firebaseio.com",
    projectId: "yamaya-app",
    storageBucket: "yamaya-app.appspot.com",
    messagingSenderId: "762714403319",
    appId: "1:762714403319:web:380a52b6f5b84a60aabef2",
    measurementId: "G-8ETCGMNMJG"
  };

export  class  Firebase {
    constructor(){
        app.initializeApp(firebaseConfig)
        this.db = app.firestore();
        this.auth = app.auth();
    }
}

/********************************************************* */


export const FirebaseContext = createContext();

export const consumerFirebase = Component => props => {
    return (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
    )
}



