import React from 'react'
import { useDispatch } from 'react-redux'
import { modalAction } from '../store/store'

const ListUi = ({ children, title }) => {
    const dispatch = useDispatch()
    return (
        <div className='bg-white rounded-xl'>
            <h1 className='flex justify-between items-center text-xl py-3 px-5 font-medium border-b'>{title}
                <button onClick={() => dispatch(modalAction.toggleModal())} className='bg-indigo-700 text-lg rounded text-white px-2 py-1'>Add</button>
            </h1>
            <div className='py-3 px-5'>
                {children}
            </div>
        </div>
    )
}

export default ListUi