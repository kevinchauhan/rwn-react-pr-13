import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import ListUi from '../components/ListUi'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app, { db } from '../firebase/firebase';
import { modalAction, usersAction } from '../store/store';
import UserForm from '../components/UserForm';

const User = () => {
    const [newEntry, setNewEntry] = useState()
    const [editId, setEditId] = useState(null)
    const users = useSelector(state => state.users)
    const disptach = useDispatch()

    useEffect(() => {
        fetchUsers()
    }, [newEntry])

    const handleEdit = (id) => {
        setEditId(id)
        disptach(modalAction.toggleModal())
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteDoc(doc(db, 'users', id))
            setNewEntry(id)

            const itemsRef = collection(db, 'assaigns');
            const q = query(itemsRef, where('user.id', '==', id));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async doc => {
                try {
                    await deleteDoc(doc.ref);
                    console.log('Document successfully deleted!');
                } catch (error) {
                    console.error('Error removing document: ', error);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const temp = []
        querySnapshot.forEach((doc) => {
            temp.push({ id: doc.id, ...doc.data() })
        });
        disptach(usersAction.fetchUsers(temp))
    }

    return (
        <>
            <Modal>
                <UserForm editId={editId} setNewEntry={setNewEntry} />
            </Modal>
            <ListUi title='User List' >
                <table className='w-full'>
                    <thead className='bg-[#f8f9fb]'>
                        <tr>
                            <th className='text-start font-medium py-2 pl-3' >Name</th>
                            <th className='text-start font-medium py-2' >Email</th>
                            <th className='text-start font-medium py-2' >Course</th>
                            <th className='text-start font-medium py-2' >Pc</th>
                            <th className='text-start font-medium py-2' colSpan={2} >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => {
                                return <tr key={i}>
                                    <td className='py-2 pl-3' >{user.name}</td>
                                    <td className='py-2' >{user.email}</td>
                                    <td className='py-2' >{user.course}</td>
                                    <td className='py-2' >{user.pc}</td>
                                    <td className='py-2 text-blue-600' ><button onClick={() => handleEdit(user)}><i className="ri-edit-2-line"></i></button></td>
                                    <td className='py-2 text-red-600' ><button onClick={() => handleDelete(user.id)}><i className="ri-delete-bin-5-line"></i></button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </ListUi>
        </>
    )
}

export default User