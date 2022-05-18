import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { GoogleLogin } from 'react-google-login';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase';


const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (user) {

            fetch('https://fierce-dawn-93622.herokuapp.com/login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email:user.user.email})
            })
            .then(res=>res.json())
            .then(data=>{
                const {token}=data
                if(token){
                    localStorage.setItem('accessToken',token)
                    navigate('/')

                }
            })
        }
    }, [user])


    const responseGoogle = (response) => {
        signInWithGoogle()
    }

    return (
        <>
            <div className="container mt-5">

                <div className="row mt-5">
                    <div className="col-8 mx-auto d-flex justify-content-center flex-column align-items-center">
                        <h4 className='text-center my-5'>Please Log In to access all functionality of my TO-DO app. Without login you cannot access the features</h4>
                        <GoogleButton
                            onClick={responseGoogle}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;