import React, { useContext } from 'react'
import { FirebaseContext } from '../server/firebase'
import { salirSesion } from '../session/sessionActions'
import { StateContext } from '../session/store';
import { Link, withRouter } from 'react-router-dom'

import useSound from 'use-sound'
//import soundBirds from './sounds/amb_city_birds.mp3'
import soundBeep from '../sounds/ui_a.mp3'

function Navbar(props) {

    let firebase = useContext(FirebaseContext);
    const [, dispatch] = useContext(StateContext);
    const [play1] = useSound(soundBeep, { volume: 0.2 }) //soundBirds

    const handleLogOut = () => {
        salirSesion(dispatch, firebase);
        props.history.push('/auth/login');

    }
    return (
        <div className='navbar'>
            <header>
                <Link to='/auth/registrar' onMouseEnter={() => { play1() }}>Registrar Usuario</Link>
                <Link to='/auth/login' onMouseEnter={() => { play1(); }}>Login</Link>
                <Link to='/'>Home</Link>
                <Link to='/auth/perfil'  onMouseEnter={() => { play1(); }}>Perfil</Link>
                <button onClick={handleLogOut}>Log out</button>
            </header>
        </div>
    )
}
export default withRouter(Navbar)
