import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../store/store'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const AssaignForm = ({ assaignList, setNewEntry }) => {
    const INITIAL_INPUT = { pc: '', user: '' }
    const [input, setInput] = useState(INITIAL_INPUT)
    const [errors, setErrors] = useState({})
    const computers = useSelector(state => state.computers)
    const users = useSelector(state => state.users)
    const [userList, setUserList] = useState([])
    const [computerList, setComputerList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setComputerList(computers.filter(comp => !assaignList.some(item => item.pc.id === comp.id)))
        setUserList(users.filter(user => !assaignList.some(item => item.user.id === user.id)))
    }, [assaignList])

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
            await addComp()
            dispatch(modalAction.toggleModal())
            setInput(INITIAL_INPUT)
        }
    }
    const validate = () => {
        const errors = {}
        if (input.pc.length < 1) {
            errors.pc = 'please select pc'
        }
        if (input.user.length < 1) {
            errors.user = 'please select user'
        }
        return errors
    }
    const addComp = async () => {
        const data = {
            user: users.filter(user => user.id === input.user)[0],
            pc: computers.filter(comp => comp.id === input.pc)[0]
        }
        try {
            const docRef = await addDoc(collection(db, "assaigns"), data);
            setNewEntry(docRef)
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
                            <select value={input.pc} onChange={handleChange} name="pc" id="" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3'>
                                <option value="" >--select pc--</option>
                                {
                                    computerList.map((comp, i) => <option key={i} value={comp.id}>{comp.pc}</option>)
                                }
                            </select>
                            <p className='text-red-500'>{errors.pc}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">User</label>
                        <div className="mt-2">
                            <select value={input.user} onChange={handleChange} name="user" id="" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3'>
                                <option value="">--select user--</option>
                                {
                                    userList.map((user, i) => <option key={i} value={user.id}>{user.name}</option>)
                                }
                            </select>
                            <p className='text-red-500'>{errors.user}</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Assaign</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AssaignForm