import React, { useState, useEffect, useContext } from 'react'
//import compose from 'recompose/compose'
import { Firebase3 } from '../server/firebase2'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { iniciarSesion } from '../session/sessionActions'
import { StateContext } from '../session/store'
import { openMensajePantalla } from '../session/snackbarAction'



function Login(props) {

    const contextType = useContext(StateContext);
    
    // [state] ====>
    //console.log('\t firebase', props.firebase)
    let { register, handleSubmit } = useForm(); 
    const [firebaseIsReady, setFirebaseIsReady] = useState(false)
    const history = useHistory();
    let firebase = useContext(Firebase3.Context)

    // [methods] ====>
    const onSubmit = async data => {

        const [ {usuario}, dispatch] = contextType;
        console.log('usuario:',usuario)
        let  response = await iniciarSesion(dispatch, data.email, data.password, firebase)
        if (response.status) {
            history.push('/listainmuebles')
        } else {
            openMensajePantalla(dispatch, { open: true, mensaje: response.mensaje })
        }
    }
    useEffect(() => {
        firebase.isReady()
            .then(result => setFirebaseIsReady(result))
            .catch()
    }, [])
    // [render] ====>
    return (
        { firebaseIsReady } &&
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='user-form'>
                <label>Ingrese e-mail:
                    <input name='email' type="text" ref={register} />
                </label>
                <label>Ingrese password:
                    <input name='password' type="password" ref={register} />
                </label>
                <button>Log In</button>
            </form>
        </div>
    )
}
export default Login
//export default compose(consumerFirebase)(Login)