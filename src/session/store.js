import React, {createContext, useContext, useReducer} from 'react'


export const SessionContext = createContext();

export const SessionProvider = ({reducer,initialState, children}) =>(
    <SessionContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </SessionContext.Provider>
)

///export const useStateValue = () => useContext(SessionContext);

/*export class Session {
    static Context = createContext();
    static counter = 0;
    constructor() {
        this.instance = null;
    }
    static getInstance = () => {  
        if (!this.instance) {
            this.instance = new Firebase2()
            this.counter++;
        }
        return this.instance
    }
    isReady=()=>( new Promise(resolve => this.auth.onAuthStateChanged(resolve)))
}*/