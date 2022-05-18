import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../../firebase';

const Navbar = () => {



    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
      };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* <button className="navbar-brand" href="#">Budget App</button> */}
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto py-3">
                            <NavLink to="/home" className="nav-link">Home </NavLink>
                            {user?  <p onClick={logout} className="nav-link">Logout</p>: <NavLink to="/login" className="nav-link">Log In </NavLink>}
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;