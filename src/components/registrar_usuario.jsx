import React, { useState, useEffect } from 'react'
import compose from 'recompose/compose';
//import { db } from '../server/firebase2'
import { consumerFirebase } from '../server/firebase'

let countRender=0;

function RegistrarUsuario(props) {
    countRender++;
    console.log('*********** props:', props.firebase)
    const [send, setSend] = useState(false)
    const [data, setData] = useState({})

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const temp = {
            name: document.getElementsByName('user_name').value,
            lastname: document.getElementsByName('user_lastname').value,
            mail: document.getElementsByName('user_mail').value,
            password: document.getElementsByName('user_password').value
        }
        setData({...temp})
        setSend(true)
        /*
        if (props.firebase.db)
            props.firebase.db.collection('Users').add(temp)
                .then(() => console.log('ok:'))
                .catch(error => console.log(error));
        setTimeout(() => {
            setSend(false)
            console.log('data:', data)
        }, 4000);
    */
        console.log('data:', data)
    }


    return (
        <div>
                <h1>{countRender}</h1>            
                <input name='user_name' placeholder='Nombre' />
                <input name='user_lastname' placeholder='Apellidos' />
                <input name='user_mail' placeholder='Email' />
                <input name='user_password' placeholder='password' />
                <br />
                <button onClick={handleSubmit}>{
                    !send
                        ? 'Enviar'
                        : 'Enviando'
                }</button>
            
        </div>
    )
}

export default compose(consumerFirebase)(RegistrarUsuario)
//export default RegistrarUsuario
