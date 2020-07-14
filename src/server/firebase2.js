import { createContext } from 'react'
import app from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/storage';


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


export class Firebase3 {
    static Context = createContext();
    ///static instance;
    constructor() {
        if (this.instance) {
            this.counter++;
            return this.instance;
        }
        this.instance = this;
        app.initializeApp(firebaseConfig)
        this.db = app.firestore()
        this.auth = app.auth()
        this.storage = app.storage();
        this.authorization = app.auth;
    }
    isReady = () => (new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
    }))
}

/*

export class Firebase2 {
    static Context = createContext();
    static counter = 0;
    static instance;
    constructor() {
        this.instance = null;
        this.app = app.initializeApp(firebaseConfig)
        this.db = app.firestore()
        this.auth = app.auth()
        //this.counter++;
    }
    static getInstance = () => {
        if (!this.instance) {
            this.instance = new Firebase2()
            this.counter++;
        }
        return this.instance
    }
    isReady = () => (new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
    }))
}


const Firebase1 = {
    data: () => ({
        db: null,
        auth: null
    }),
    init: () => {
        app.initializeApp(firebaseConfig)
            .db = app.fireStore()
        this.auth = app.auth()
    }
}

Object.freeze(Firebase1);
export default Firebase1;
*/