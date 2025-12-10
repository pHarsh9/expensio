import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user) return

        let isMounted = true

        const fetchUserInfo = async ()=> {
            try {
                const respose = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                if( isMounted && respose.data ){
                    updateUser(respose.data)
                }
            } catch (error) {
                console.error("Failed to fetch user info: ", error)
                if(isMounted){
                    clearUser()
                    navigate("/login")
                }
            }
        }
        fetchUserInfo()

        return () => {
            isMounted= false
        }
    },[updateUser,clearUser, navigate])
}