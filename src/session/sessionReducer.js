import { SessionProvider } from "./store";

 const SessionReducer = (state, action) => {
    switch(action.type){
        case 'INICIAR_SESION':
        return{
            ...state,
            usuario:action.session,
            autenticado:action.autenticado
        };
        case 'CAMBIAR_SESION':
        return {
            ...state,
            usuario: action.nuevoUsuario,
            autenticado: action.autenticado
        };
        case 'SALIR_SESION':
        return{
            ...state,
            usuario: action.sesion,
            autenticado:action.autenticado
        }
        default:
            return state
    }
}
export default SessionProvider