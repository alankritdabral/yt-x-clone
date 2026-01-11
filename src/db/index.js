import express from "express"
import mongoose, { connect } from "mongoose"
import { configDotenv } from "dotenv"


const app = express()

app.use(express.json(0))

const connection = async () => {
  try {

    await mongoose.connect(`${process.env.abcd}/${process.env.Dbname}`)
    console.log("connected")
   
    app.listen(process.env.port ,()=>{
      console.log("listning")
    })  
  }
  catch (error){
    console
  }   


  

