import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({ Cmp }) => {
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [auth])

    return Cmp
}

export default Protected