import React from 'react'
import compose from 'recompose/compose';
import { consumerFirebase } from '../server/firebase'
import { useForm } from 'react-hook-form'
let countRender = 0;

const constraints = {
    user_mail: { required: true },
    user_name: { minLength: { value: 8 } }
}

const messages = {
    user_mail: 'email is required',
    user_name: '8 characters max'
}

function RegistrarUsuario(props) {
    // [1] ====>
    countRender++;
    let { register, handleSubmit, errors } = useForm();
    //  [2] ====>
    const onSubmit = (data) => {
        props.firebase.auth
            .createUserWithEmailAndPassword(data.user_mail, data.user_password)
            .then(
                result => {
                    let final_user = { ...data, id: result.user.uid }
                    props.firebase.db.collection('Users').add(final_user)
                        .then(
                            (result) =>
                                console.log('ok:', result),
                            props.history.push('/')
                        )
                        .catch(error => console.log(error));
                }
            )
            .catch()

    }
    return (
        <div>
            <h1>Usar react Hook form {countRender}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='user-form'>
                <input name='user_name' placeholder='Nombre' ref={register(constraints.user_name)} />{errors.user_name && <span>{messages.user_name}</span>}
                <input name='user_lastname' placeholder='Apellidos' ref={register} />
                <input name='user_mail' placeholder='Email' ref={register(constraints.user_mail)} />{errors.user_mail && <span>{messages.user_mail}</span>}
                <input name='user_password' placeholder='password' ref={register} />
                <br />
                <button>send </button>
            </form>
        </div>
    )
}
export default compose(consumerFirebase)(RegistrarUsuario)
//export default RegistrarUsuario
