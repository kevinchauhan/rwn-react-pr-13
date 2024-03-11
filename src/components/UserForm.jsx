import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { modalAction } from '../store/store'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const Form = ({ editId, setNewEntry }) => {
    const INITIAL_INPUT = { name: '', email: '', course: '' }
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState(INITIAL_INPUT)
    const dispatch = useDispatch()

    useEffect(() => {
        if (editId) {
            setInput(editId)
        }
    }, [editId])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const checkValidate = validate()
        if (Object.keys(checkValidate).length > 0) {
            setErrors(checkValidate)
        } else {
            setErrors({})
            if (editId) {
                await updateUser()
            } else {
                await addUser()
            }
            dispatch(modalAction.toggleModal())
            setInput(INITIAL_INPUT)
        }
    }
    const validate = () => {
        const errors = {}
        if (input.name.length < 1) {
            errors.name = 'please enter an name'
        }
        if (input.email.length < 1) {
            errors.email = 'please enter an email'
        }
        if (input.course.length < 1) {
            errors.course = 'please enter your course'
        }
        return errors
    }

    const addUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), input);
            console.log(docRef)
            console.log("Document written with ID: ", docRef.id);
            setNewEntry(docRef)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const updateUser = async () => {
        try {
            const userRef = doc(db, "users", editId.id);
            const res = await updateDoc(userRef, input);
            setNewEntry(data)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleForm}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" type="text" autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" value={input.name} onChange={handleChange} />
                            <p className='text-red-500' >{errors.name}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" value={input.email} onChange={handleChange} />
                            <p className='text-red-500' >{errors.email}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">Course</label>
                        <div className="mt-2">
                            <input id="course" name="course" type="text" autoComplete="course" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" value={input.course} onChange={handleChange} />
                            <p className='text-red-500' >{errors.course}</p>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{editId ? 'Update' : 'Add'}</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Form