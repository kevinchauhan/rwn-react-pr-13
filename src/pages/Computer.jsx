import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal'
import ListUi from '../components/ListUi'
import { computerAction, modalAction } from '../store/store'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import CompForm from '../components/CompForm'

const Computer = () => {
    const [newEntry, setNewEntry] = useState()
    const [editId, setEditId] = useState(null)
    const computers = useSelector(state => state.computers)
    const disptach = useDispatch()

    useEffect(() => {
        fetchComp()
    }, [newEntry])

    const handleEdit = (id) => {
        setEditId(id)
        disptach(modalAction.toggleModal())
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteDoc(doc(db, 'computers', id))
            setNewEntry(id)

            const itemsRef = collection(db, 'assaigns');
            const q = query(itemsRef, where('pc.id', '==', id));

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

    const fetchComp = async () => {
        const querySnapshot = await getDocs(collection(db, "computers"));
        const temp = []
        querySnapshot.forEach((doc) => {
            temp.push({ id: doc.id, ...doc.data() })
        });
        disptach(computerAction.fetchComputers(temp))
    }

    return (
        <>
            <Modal>
                <CompForm editId={editId} setNewEntry={setNewEntry} />
            </Modal>
            <ListUi title={'Computers List'}>
                <table className='w-full'>
                    <thead className='bg-[#f8f9fb]'>
                        <tr>
                            <th className='text-start font-medium py-2 pl-3' >Pc</th>
                            <th className='text-start font-medium py-2' >Description</th>
                            <th className='text-center font-medium py-2' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            computers.map((computer, i) => {
                                return <tr key={i}>
                                    <td className='py-2 pl-3' >{computer.pc}</td>
                                    <td className='py-2' >{computer.dsc}</td>
                                    <td className='py-2 text-center' >
                                        <button className='text-blue-600 mr-3' onClick={() => handleEdit(computer)}><i className="ri-edit-2-line"></i></button>
                                        <button className='text-red-600' onClick={() => handleDelete(computer.id)}><i className="ri-delete-bin-5-line"></i></button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </ListUi >
        </>
    )
}

export default Computer