import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='w-[280px] bg-white py-3 border-r'>
            <Link to={'/'}>
                <h1 className='text-2xl px-8 font-bold text-indigo-500 py-2 border-b'>PR-13</h1>
            </Link>
            <div className='mt-8 px-8'>
                <ul>
                    <li className='py-1' ><NavLink to='/user' className='hover:bg-indigo-600 hover:text-white px-2 rounded-xl font-medium w-full inline-block py-2'>Users</NavLink></li>
                    <li className='py-1' ><NavLink to='/computers' className='hover:bg-indigo-600 hover:text-white px-2 rounded-xl font-medium w-full inline-block py-2'>Computers</NavLink></li>
                    <li className='py-1' ><NavLink to='/assaign' className='hover:bg-indigo-600 hover:text-white px-2 rounded-xl font-medium w-full inline-block py-2' >Assaign</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar