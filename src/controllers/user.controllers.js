import { asyncHandler } from "../utils/Asynchandler.js";

const registerUser = asyncHandler((req,res,next)=> {
    const {email}=req.body 
    console.log(email)
})

export {registerUser}   