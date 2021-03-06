export const iniciarSesion = (dispatch, email, password, firebase) => {

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
                            console.log('UsuarioDB:',usuarioDB);
                            dispatch({
                                type: "INICIAR_SESION",
                                sesion: usuarioDB,
                                autenticado: true
                            });
                            resolve({ status: true })
                        })
                })
                .catch(error => {
                    resolve({ status: false, mensaje: error })
                })
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
                            apellido: Usuario.apellido,
                            telefono: '',
                            foto: '',
                        }, { merge: true }
                        )
                        .then(doc => {
                            Usuario.id = auth.user.uid;
                            dispatch({
                                type: 'INICIAR_SESION',
                                sesion: Usuario,
                                autenticado: true
                            })
                            resolve({ status: true })
                        }
                        )
                        .catch(
                            error => resolve({ status: false, mensaje: error })
                        )
                }
            )
            .catch(error => {
                resolve({ status: false, mensaje: error })
            })
    }
    )
}

export const salirSesion = (dispatch, firebase) => {
    return new Promise(
        (resolve, eject) => {
            firebase.auth.signOut()
                .then(
                    salir => dispatch({
                        type: "SALIR_SESION",
                        nuevoUsuario: {
                            nombre: '',
                            apellido: '',
                            email: '',
                            foto: '',
                            id: '',
                            telefono: ''
                        },
                        autenticado: false
                    }),
                    resolve({status:true})
                )
        }
    )
}

