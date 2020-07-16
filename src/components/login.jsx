import React, { useState, useEffect, useContext } from 'react'
//import compose from 'recompose/compose'
import { FirebaseContext } from '../server/firebase'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { iniciarSesion } from '../session/sessionActions'
import { StateContext } from '../session/store'

function Login() {

    // [state] ====>
    console.log('Login:')
    const [{ usuario }, dispatch] = useContext(StateContext);
    const firebase = useContext(FirebaseContext)
    let { register, handleSubmit } = useForm();
    //const [firebaseIsReady, setFirebaseIsReady] = useState(false)
    const history = useHistory();

    // [methods] ====>
    const onSubmit = async data => {

        console.log('\t usuario:', usuario)
        let response = await iniciarSesion(dispatch, data.email, data.password, firebase)
        if (response.status) {
            history.push('/listainmuebles')
        } else {
            alert(response.mensaje)
        }
    }
    /*useEffect(() => {
        firebase.isReady()
            .then(result => setFirebaseIsReady(result))
            .catch()
    }, [])*/

    return (
        { /*firebaseIsReady*/ } &&
        <form onSubmit={handleSubmit(onSubmit)} className='user-form'>
            <label>Ingrese e-mail:
                    <input name='email' type="text" ref={register} />
            </label>
            <label>Ingrese password:
                    <input name='password' type="password" ref={register} />
            </label>
            <button>Log In</button>
        </form>
    )
}
export default Login
//export default compose(consumerFirebase)(Login)