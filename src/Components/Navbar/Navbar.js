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
                    <h1 className="navbar-brand ms-5" href="#">TO-DO App</h1>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto py-3">
                            <NavLink to="/" className="nav-link">Home </NavLink>
                            {user?  <button onClick={logout} className="btn btn-primary mx-4">Logout</button>: <NavLink to="/login" className="nav-link">Log In </NavLink>}
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;