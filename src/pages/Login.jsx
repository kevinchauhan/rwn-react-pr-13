import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/store';


const Login = () => {
    const initialInput = { email: 'admin@gmail.com', password: '123456' }
    const [input, setInput] = useState(initialInput)
    const [errors, setErrors] = useState({})
    const auth = useSelector(state => state.auth)
    const disptach = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleForm = (e) => {
        e.preventDefault()
        const checkValidate = validate()
        if (Object.keys(checkValidate).length > 0) {
            setErrors(checkValidate)
        } else {
            setErrors({})
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, input.email, input.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    disptach(authAction.login(user.uid))
                    // ...
                    setInput(initialInput)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrors({ password: 'Invalid email or password' })
                });
        }
    }

    const googleLogin = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                disptach(authAction.login(user.uid))
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(error)
            });
    }

    const validate = () => {
        const errors = {}
        if (input.email.length < 1) {
            errors.email = 'please enter an email'
        }
        if (input.password.length < 1) {
            errors.password = 'please enter a password'
        }
        return errors
    }

    return (
        <div className="rounded-xl pb-10 bg-white">
            <h2 className="text-2xl px-5 py-5 border-b text-center font-bold mb-6">Login</h2>
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleForm}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email</label>
                        <input type="email" id="email" name="email" value={input.email} onChange={handleChange} className="block w-full p-2 border-gray-300 border bg-transparent rounded-lg focus:outline-none focus:border-indigo-500" />
                        <p className='text-red-400'>{errors.email}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block">Password</label>
                        <input type="password" id="password" name="password" value={input.password} onChange={handleChange} className="block w-full p-2 border-gray-300 border bg-transparent rounded-lg focus:outline-none focus:border-indigo-500" />
                        <p className='text-red-400'>{errors.password}</p>
                    </div>
                    <div className="mb-6">
                        <input type="submit" defaultValue="Sign Up" className="w-full p-2 bg-indigo-600 text-white font-bold rounded cursor-pointer hover:bg-indigo-700 focus:outline-none" />
                    </div>
                    {/* <p className="">Don't have an account? <Link to="/signup" className="text-indigo-500">Sign up</Link></p> */}
                </form>
                {/* <button className='hover:bg-indigo-600 hover:text-white border border-indigo-500 rounded font-medium w-full mt-3 px-2 py-1.5' onClick={googleLogin}><i className="ri-google-fill text-xl align-middle"></i> Sign in with Google</button> */}
            </div>
        </div>
    )
}

export default Login