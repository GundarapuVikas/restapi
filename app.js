const express = require('express');
const app=express();
const mongoose = require('mongoose');
app.use(express.json())
//DB Connection
mongoose.connect("mongodb://localhost:27017/crud",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("Connected to db")
    }else{
        console.log(err)
    }
})
//SCHEMA

const sch={
    name:String,
    email:String,
    id:Number
}
const monmodel=mongoose.model("crud_collection",sch);

//POST

app.post("/post",async(req,res)=>{
    console.log("inside post func");
    const data=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    });
    const val=await data.save();
    res.send("data pushed to db");
})
//PUT
app.put("/update/:id",async(req,res)=>{
    let upid=req.params.id;
    let upname=req.body.name;
    let upemail=req.body.email;
    //find id
    //update
    //these two things can be done using single funciton itself
    monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},{new:true},(err,data)=>{
        if(err){
            res.send("error found")
        }else{
            if(data=null){
                res.send("nothing found")
            }else{
                res.send("data updated")
            }
        }
    })
})
//FETCH/GET
app.get("/fetch/:id",function(req,res){
    let gid=req.params.id;
    monmodel.find(({id:gid}),function(err,val){
        if(err){
            res.send("error found")
        }else{
            if(val.length==0){
                res.send("no data found in db")
            }else{
                res.send(val);
            }    
        }
    })
})
//DELETE
app.delete('/del/:id',function(req,res){
    let did=req.params.id;
    //to delete multiple records with same id
    monmodel.deleteMany(({id:did}),function(err,data){
        if(err){
            res.send("error in deletion")
        }else{
            res.send(data)//data that is goind to be deleted is shown in postman
        }
    })
    // monmodel.findOneAndDelete(({id:did}),function(err,data){
    //     if(err){
    //         res.send("error in deletion")
    //     }else{
    //         res.send(data)//data that is goind to be deleted is shown in postman
    //     }
    // })
})
app.listen(3000,()=>{
    console.log("on port 3000")
})
