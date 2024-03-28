import { createSlice, configureStore } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
      isLoggedIn: false,
      isWalletConnected: false
    },
    reducers: {
      setIsLoggedIn: (state, { payload }) => {
        return {
            ...state,
            isLoggedIn:payload
        }
      },
      setIsWalletConnected: (state, { payload }) => {
        return {
            ...state,
            isWalletConnected:payload
        }
      }
    }
})

export default appSlice