import React, { useState, useContext, useEffect } from 'react'
import { Firebase3 } from '../server/firebase2'
import { useForm } from 'react-hook-form'
import { StateContext } from '../session/store';
import { crearUsuario } from '../session/sessionActions'

let countRender = 0;

const constraints = {
    email: { required: true },
    nombre: { minLength: { value: 4 } }
}

const messages = {
    email: 'email is required',
    nombre: '4 characters max'
}

function RegistrarUsuario(props) {

    // [state] ====>
    countRender++;
    const firebase = useContext(Firebase3.Context)
    const [{ sesion }, dispatch] = useContext(StateContext)
    let { register, handleSubmit, errors } = useForm();
    const [firebaseIsReady, setFirebaseIsReady] = useState(false)

    //  [methods] ====>
    const onSubmit = async (data) => {

        let response = await crearUsuario(dispatch, firebase, data)
        if (response.status) {
            props.history.push('/') //or UseHistory
        } else {
            alert(response.mensaje)
        }

        /*firebase.auth
            .createUserWithEmailAndPassword(data.user_mail, data.user_password)
            .then(
                result => {
                    let final_user = { ...data, id: result.user.uid }
                    firebase.db.collection('Users').add(final_user)
                        .then(
                            (result) =>
                                console.log('ok:', result),
                            props.history.push('/')
                        )
                        .catch(error => console.log(error));
                }
            )
           .catch()
           */

    }

    useEffect(() => {
        firebase.isReady()
            .then(result =>{ 
                setFirebaseIsReady(result) 
                console.log('ready:',firebaseIsReady)} )
        .catch()
}, [])

return (
    { firebaseIsReady } &&
    <div>
        <h1>Usar react Hook form {countRender}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='user-form'>
            <input name='nombre' placeholder='Nombre' ref={register(constraints.nombre)} />{errors.nombre && <span>{messages.nombre}</span>}
            <input name='apellido' placeholder='Apellidos' ref={register} />
            <input name='email' placeholder='Email' ref={register(constraints.email)} />{errors.email && <span>{messages.email}</span>}
            <input name='password' placeholder='password' ref={register} />
            <br />
            <button>send </button>
        </form>
    </div>
)
}
//export default compose(consumerFirebase)(RegistrarUsuario)
export default RegistrarUsuario
