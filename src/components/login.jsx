import React, { useState, useEffect, useContext } from 'react'
//import compose from 'recompose/compose'
import { Firebase2 } from '../server/firebase2'
import { useForm } from 'react-hook-form'
import { useHistory} from 'react-router-dom'

function Login(props) {
    console.log('props:',props)
    // [state] ====>
    //console.log('\t firebase', props.firebase)
    let { register, handleSubmit } = useForm();
    const [firebaseIsReady, setFirebaseIsReady] = useState(false)
    let history = useHistory();
    let firebase = useContext(Firebase2.Context)

    // [methods] ====>
    const onSubmit = (data) => {
        firebase.auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then( 
                result => console.log('result:',result)
                ,history.push('/')
             )
            .catch( error => console.log('error:',error) )
    }
    useEffect(() => {
        firebase.isReady()
        .then( result => setFirebaseIsReady(result) )
        .catch()

    }, [])
    // [render] ====>
    return (
        {firebaseIsReady}&&
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