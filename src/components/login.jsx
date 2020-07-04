import React, { useState, useEffect } from 'react'
import compose from 'recompose/compose'
import { consumerFirebase } from '../server/firebase'
import { useForm } from 'react-hook-form'
import {useHistory} from 'react-router-dom'

function Login(props) {
    // [state] ====>
    console.log('\t firebase', props.firebase)
    let { register, handleSubmit } = useForm();
    const [firebase, setFirebase] = useState()
    let history = useHistory();

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
        setFirebase(props.firebase)
        console.log('useEffect')
    }, [])
    // [render] ====>
    return (
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

export default compose(consumerFirebase)(Login)