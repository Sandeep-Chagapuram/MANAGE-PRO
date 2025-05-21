import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/TaskManager")

let taskschema = mongoose.Schema({
    'title':{
        type: String,
        unique : true,
        required : true
    },
    'create_date':{
        type: Date,
        default : Date.now
    },
    'due_date':{
        type:Date,
        default : Date.now
    },
    'finished_date':{
        type:Date,
    }
    ,
    'desc':{
        type: String,
        default:"No description provided"
    },
    'status':{
        type:String,
        default:"pending"
    }
})

let task = mongoose.model("task",taskschema)

app.post("/addtask", async (req,res)=>{
    let {title,due_date,desc} = req.body
    const newtask = new task({title :title,due_date: due_date,desc: desc})
    await newtask.save()
    res.send("Task added successfully")
})

app.get("/getdata",async(req,res)=>{
    let data = await task.find({
        title : {$nin :[undefined,null,""]},
        status :'pending'
    })
    res.json(data)
})

app.post("/remove",async(req,res)=>{
    let title = req.body.title
    await task.deleteOne({title})
    console.log("removed task");
    res.send("deleted task")
})

app.post("/finished",async(req,res)=>{
    let title = req.body.title
    await task.updateOne({title:title},{$set:{status:'finished',finished_date:Date.now()}})
    console.log("updated finish");
    res.send("updated finished")
    
})

app.get("/getFinishedData",async(req,res)=>{
    let data = await task.find({
        title : {$nin :[undefined,null,""]},
        status :'finished'
    })
    res.json(data)
})

app.listen(3000,()=>{
    console.log("Server is live");
    
})