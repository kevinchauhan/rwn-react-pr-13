import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { db } from '../firebase/firebase'
import AssaignForm from '../components/AssaignForm'
import Modal from '../components/Modal'
import ListUi from '../components/ListUi'

const Assaign = () => {
    const [editId, setEditId] = useState(null)
    const [newEntry, setNewEntry] = useState()
    const [assaignList, setAssaignList] = useState([])
    const disptach = useDispatch()

    // console.log('user===>', userList)
    // console.log('comp===>', computerList)
    // console.log('assagin===>', assaignList)

    useEffect(() => {
        fetchUsers()
    }, [newEntry])

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "assaigns"));
        const temp = []
        querySnapshot.forEach((doc) => {
            temp.push({ id: doc.id, ...doc.data() })
        });
        setAssaignList(temp)
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteDoc(doc(db, 'assaigns', id))
            setNewEntry(id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal>
                <AssaignForm assaignList={assaignList} setNewEntry={setNewEntry} />
            </Modal>
            <ListUi title={'Assaign List'}>
                <table className='w-full'>
                    <thead className='bg-[#f8f9fb]'>
                        <tr>
                            <th className='text-start font-medium py-2 pl-3' >Pc Name</th>
                            <th className='text-start font-medium py-2' >User Name</th>
                            <th className='text-center font-medium py-2' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assaignList.map((item, i) => {
                                return <tr key={i}>
                                    <td className='py-2 pl-3' >{item.pc.pc}</td>
                                    <td className='py-2' >{item.user.name}</td>
                                    <td className='py-2 text-center' >
                                        <button className='text-red-600' onClick={() => handleDelete(item.id)}><i className="ri-delete-bin-5-line"></i></button>
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

export default Assaign