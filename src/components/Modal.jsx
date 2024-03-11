import React, { useState } from 'react'
import Form from './UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../store/store'

const Modal = ({ children }) => {
    const isActive = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const handleModal = () => {
        dispatch(modalAction.toggleModal())
    }
    return (
        <div className={`relative z-10 ${isActive ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg py-2 pb-10 px-5">
                        <div className='text-end mb-3'>
                            <button onClick={handleModal} >x</button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal