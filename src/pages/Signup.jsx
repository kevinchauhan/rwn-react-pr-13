import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/store';


const Signup = () => {
    const initialInput = { name: '', email: '', password: '' }
    const [input, setInput] = useState(initialInput)
    const [errors, setErrors] = useState({})
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
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
            createUser()
        }
    }

    const createUser = () => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                dispatch(authAction.login(user.uid))
                setInput(initialInput)
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                // ..
                if (errorCode.includes('email')) {
                    setErrors({ email: 'email already exists' })
                }
            });
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
                dispatch(authAction.login(user.uid))
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
            });
    }

    const validate = () => {
        const errors = {}
        if (input.name.length < 1) {
            errors.name = 'please enter name'
        }
        if (input.email.length < 1) {
            errors.email = 'please enter an email'
        }
        if (input.password.length < 1) {
            errors.password = 'please enter a password'
        } else if (input.password.length < 6) {
            errors.password = 'password must be atleast 6 chars long'
        }
        return errors
    }

    return (
        <div className="rounded-xl pb-10 bg-white">
            <h2 className="text-2xl px-5 py-5 border-b text-center font-bold mb-6">Sign Up</h2>
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleForm}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block">Name</label>
                        <input type="text" id="name" name="name" value={input.name} onChange={handleChange} className="block w-full p-2 border-gray-300 border bg-transparent rounded-lg focus:outline-none focus:border-indigo-500" />
                        <p className='text-red-400'>{errors.name}</p>
                    </div>
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
                    <p className="">Already have an account? <Link to="/login" className="text-indigo-500">Log In</Link></p>
                </form>
                <button className='hover:bg-indigo-600 hover:text-white border border-indigo-500 rounded font-medium w-full mt-3 px-2 py-1.5' onClick={googleLogin}><i className="ri-google-fill text-xl align-middle"></i> Sign in with Google</button>
            </div>
        </div>
    )
}

export default Signup