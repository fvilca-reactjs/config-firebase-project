import React,{useContext} from 'react'
import { StateContext } from '../session/store'

function ListaInmuebles() {
    
    console.log('Home:')
    const [{usuario}, ] = useContext(StateContext);
    
    console.log('\t usuario:',usuario)
    
    return (
        <div>
            {usuario.nombre}
            Listado de muebles. pagina inicial
        </div>
    )
}
export default ListaInmuebles;