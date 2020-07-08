export const iniciarSession = (dispatch, email, password, firebase) => {
    return new Promise(
        (resolve, eject) => {
            firebase.auth
                .signInWithEmailAndPassword(email, password)
                .then(auth => {
                    firebase.db
                        .collection('Users')
                        .doc(auth.user.uid)
                        .get()
                        .then(doc => {
                            const usuarioDB = doc.data();
                            dispatch({
                                type: 'INICIAR_SESSION',
                                sesion: usuarioDB,
                                autenticado: true
                            })
                        })
                })
                .catch(
                    error => console.log(error)
                )
        }
    )
}


export const crearUsuario = (dispatch, firebase, Usuario) => {
    return new Promise((resolve, eject) => {
        firebase.auth
            .createUserWithEmailAndPassword(Usuario.email, Usuario.password)
            .then(
                auth => {
                    firebase.db
                        .collection('Users')
                        .doc(auth.user.uid)
                        .set({
                            id: auth.user.uid,
                            email: Usuario.email,
                            nombre: Usuario.nombre,
                            apellido: Usuario.apellido
                        }, { merge: true }
                        )
                        .then(doc => {
                            Usuario.id = auth.user.uid;
                            dispatch({
                                type: 'INICIAR_SESION',
                                sesion: Usuario,
                                autenticado: true
                            })
                            resolve()
                        }
                        )
                        .catch(
                            error=>console.log(error)
                        )
                }
            )
    }
    )
}

export const salirSession = (dispatch, firebase) => {
    return new Promise(
        (resolve, eject)=>{
            firebase.auth.signOut()
            .then(
                salir=> dispatch({
                    type:"SALIR_SESION",
                    nuevoUsuario:{
                        nombre:'',
                        apellido:'',
                        email:'',
                        foto:'',
                        telefono:'',
                        id:''
                    }
                }),
                resolve()
            )
        }
    )
}

