import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import app from '../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../store/store'

const Header = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const handleLogout = (e) => {
        e.preventDefault()
        const auth = getAuth(app);

        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out');
                dispatch(authAction.logout())
                // Perform any other actions after logout if needed.
            })
            .catch((error) => {
                // An error happened.
                console.error('Error signing out:', error);
            });
    }
    return (
        <header className='bg-white border-b'>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative py-3">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {
                                    auth ? <button onClick={handleLogout} className="text-gray-600 cursor-pointer hover:text-indigo-500 rounded-md px-3 py-2 text-sm font-medium">Logout</button>
                                        : <>
                                            <Link to="/login" className="text-gray-600 cursor-pointer hover:text-indigo-500 rounded-md px-3 py-2 text-sm font-medium">Login</Link>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header