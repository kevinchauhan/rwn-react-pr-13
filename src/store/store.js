import { configureStore, createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return null
        }
    }
})
const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        fetchUsers(state, action) {
            return action.payload
        }
    }
})

const computerSlice = createSlice({
    name: 'computers',
    initialState: [],
    reducers: {
        fetchComputers(state, action) {
            return action.payload
        }
    }
})

const modalSlice = createSlice({
    name: 'modal',
    initialState: false,
    reducers: {
        toggleModal: (state) => !state
    }
})

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        computers: computerSlice.reducer,
        modal: modalSlice.reducer
    }
})

export const authAction = authSlice.actions
export const usersAction = usersSlice.actions
export const computerAction = computerSlice.actions
export const modalAction = modalSlice.actions
export default store