import { Switch } from "react-router-dom"

const initialState={
    open:false,
    mensaje:''
}

const openSnackbarReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'OPEN':
            return{
                ...state,
                open: true,
                mensaje: action.mensaje
            }
        default:
            return state;
    }
}

export default openSnackbarReducer
