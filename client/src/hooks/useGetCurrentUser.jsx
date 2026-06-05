import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const useGetCurrentUser = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    const getCurrentUser = async () =>{
      try {
        const res = await axios.get(`${serverUrl}/api/user/me`,{withCredentials:true})
        dispatch(setUserData(res.data?.user === null ? null : res.data))
      } catch (error) {
        console.log(error)
      }
    }
    getCurrentUser()

    window.addEventListener("auth:changed", getCurrentUser)

    return () => {
      window.removeEventListener("auth:changed", getCurrentUser)
    }
  },[])
}

export default useGetCurrentUser
