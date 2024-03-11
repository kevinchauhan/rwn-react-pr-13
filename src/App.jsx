import './App.css'
import React, { useEffect } from 'react'
import Header from './components/Header'
import User from './pages/User'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Computer from './pages/Computer'
import Assaign from './pages/Assaign'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Protected from './routes/Protected'
import { useDispatch } from 'react-redux'
import app, { db } from './firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { authAction, computerAction, usersAction } from './store/store'
import { collection, getDocs } from 'firebase/firestore'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        dispatch(authAction.login(uid))
        // ...
        getData()
      }
    });
  }, [])

  const getData = async () => {
    const users = await fetchUsers('users')
    const computers = await fetchUsers('computers')
    dispatch(usersAction.fetchUsers(users))
    dispatch(computerAction.fetchComputers(computers))
  }

  const fetchUsers = async (collect) => {
    const querySnapshot = await getDocs(collection(db, collect));
    const temp = []
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() })
    });
    return temp
  }

  return (
    <>
      <BrowserRouter>
        <section className='flex min-h-screen'>
          <Navbar />
          <main className='w-full'>
            <Header />
            <div className="p-5">
              <Routes>
                <Route path='/' element={<h1 className='text-center text-3xl'>PR - 13</h1>} />
                <Route path='/user' element={<Protected Cmp={<User />} />} />
                <Route path='/computers' element={<Protected Cmp={<Computer />} />} />
                <Route path='/assaign' element={<Protected Cmp={<Assaign />} />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </main>
        </section>
      </BrowserRouter>
    </>
  )
}

export default App