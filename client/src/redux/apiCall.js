import { loginFaliure, loginStart, loginSuccess,logOut } from "./userRedux"
import { publicReq, userReq } from "../requestMethod"

export const login = async (dispatch,user)=>{
    dispatch(loginStart())
    try{
        const res = await publicReq.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFaliure())     
    }
}

export const register = async (user)=>{
    try{
         await publicReq.post("/auth/register",user)  
    }catch(err){
    }
}
export const userUpdate = async (user)=>{
    try{
         await userReq.put("/auth/register",user)  
    }catch(err){
    }
}
export const orderItem = async (cart)=>{
    try{
         await userReq.post("/order",cart)  
    }catch(err){
    }
}
export const logout = async (dispatch)=>{   
    dispatch(logOut())
    
}
