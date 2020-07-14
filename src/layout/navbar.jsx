import React, { useContext } from 'react'
import { Firebase3 } from '../server/firebase2'
import { salirSesion } from '../session/sessionActions'
import { useStateValue } from '../session/store';
import { Link, withRouter } from 'react-router-dom'

import useSound from 'use-sound'
//import soundBirds from './sounds/amb_city_birds.mp3'
import soundBeep from '../sounds/ui_a.mp3'

function Navbar(props) {

    let firebase = useContext(Firebase3.Context);
    const [, dispatch] = useStateValue();
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
                <button onClick={handleLogOut}>Log out</button>
            </header>
        </div>
    )
}
export default withRouter(Navbar)
