import React, { useState, useEffect } from 'react'
import compose from 'recompose/compose'
import { consumerFirebase } from '../server/firebase'
import { useForm } from 'react-hook-form'

function Login({ firebase }) {
    // [state] ====>
    console.log('\t firebase', firebase)
    let { register, handleSubmit } = useForm();
    const [firebaseObject, setFirebase] = useState()
    // [methods] ====>
    const onSubmit = (data) => {
        console.log('data', data)
    }
    useEffect(() => { 
        setFirebase(firebase) 
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