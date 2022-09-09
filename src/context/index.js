import { React } from "react"
import axios from "axios"
import { baseUrl } from "../api"
import { useReducer } from "react"
import { createContext } from "react"
import { act } from "react-dom/test-utils"

const reducer = (state, action) => {
    switch(action.type) {
        case "GET_DATA": 
            return {
                ...state, 
                loading: true,
                userData: []
            }
        case "GET_DATA_SUCCESS":
            return {
                ...state,
                loading: false,
                userData: action.payload
            }
        case "DELETE_DATA":
            return {
                ...state, 
                loading: false,
                userData: [
                    ...state.userData.filter((data) => data.id !== action.payload.id)
                ]
            }
        case "CHANGE_DATA": 
            const shopListCopy = [...state.userData]
            const i = shopListCopy.findIndex((item) => item.id === action.payload.id)
            shopListCopy[i] = {...shopListCopy[i], ...action.payload.data}
            return {
                ...state,
                loading: false,  
                userData: shopListCopy
            }
        default: 
            return {...state}
    }
}

const UserDataContext = createContext()

export const getData = (dispatch) => {
    dispatch({type: "GET_DATA"})
    axios.get(baseUrl)
    .then(resp => {
        dispatch({
            type: "GET_DATA_SUCCESS",
            payload: resp.data
        })
    })
}

export const deleteData = (id, dispatch) => {
    dispatch({
        type: "DELETE_DATA",
        payload: {
            id: id
        }
    })
}

export const changeData = (id, data, dispatch) => {

    dispatch({
        type: "CHANGE_DATA",
        payload: {
            id: id,
            data: data
        }
    })
}

const UserDataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        userData: []
    })

    return (
        <UserDataContext.Provider value = {{state, dispatch}}>
            {children}
        </UserDataContext.Provider>
    )
}

export {UserDataProvider, UserDataContext}