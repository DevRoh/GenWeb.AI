import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'

const useGetCurrentUser = () => {
  useEffect(()=> {
    const getCurrentUser = async () =>{
      try {
        const res = await axios.get(`${serverUrl}/api/user/me`,{withCredentials:true})
        console.log(res)
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
