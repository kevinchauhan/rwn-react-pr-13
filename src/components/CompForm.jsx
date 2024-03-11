import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../store/store'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const CompForm = ({ editId, setNewEntry }) => {
    const INITIAL_INPUT = { pc: '', dsc: '' }
    const [input, setInput] = useState(INITIAL_INPUT)
    const [errors, setErrors] = useState({})
    const computers = useSelector(state => state.computers)
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
                await updateComp()
            } else {
                await addComp()
            }
            dispatch(modalAction.toggleModal())
            setInput(INITIAL_INPUT)
        }
    }
    const validate = () => {
        const errors = {}
        if (computers.some(comp => comp.pc === input.pc)) {
            errors.pc = 'pc name already exists'
        }
        if (input.pc.length < 1) {
            errors.pc = 'please enter pc name'
        }
        if (input.dsc.length < 1) {
            errors.dsc = 'please enter description'
        }
        return errors
    }

    const addComp = async () => {
        try {
            const docRef = await addDoc(collection(db, "computers"), input);
            setNewEntry(docRef)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const updateComp = async () => {
        try {
            const compRef = doc(db, "computers", editId.id);
            const data = { ...input }
            delete data.id
            const res = await updateDoc(compRef, data);
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
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Pc</label>
                        <div className="mt-2">
                            <input id="pc" name="pc" type="text" autoComplete="pc" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" value={input.pc} onChange={handleChange} />
                            <p className='text-red-500'>{errors.pc}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="dsc" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                            <input id="lab" name="dsc" type="text" autoComplete="dsc" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" value={input.dsc} onChange={handleChange} />
                            <p className='text-red-500'>{errors.dsc}</p>
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

export default CompForm