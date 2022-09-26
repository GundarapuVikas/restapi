const express = require('express');
const app=express();
const mongoose = require('mongoose');
app.use(express.json())
//DB Connection
mongoose.connect("mongodb+srv://WholesomeEten:wholesome123@wholesomeeten.hjigq.mongodb.net/WholesomeEten?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("Connected to db")
    }else{
        console.log(err)
    }
})

const dietSchema = new mongoose.Schema({
    name: {
      type: "String",
    },
    cook_time: {
      type: "Number",
    },
    prep_time: {
      type: "Number",
    },
    breakfast: {
      type: "Boolean",
    },
    lunch: {
      type: "Boolean",
    },
    snacks: {
      type: "Boolean",
    },
    dinner: {
      type: "Boolean",
    },
    mainCourse: {
      type: "Boolean",
    },
    condiments: {
      type: "Boolean",
    },
    recipeCategory: {
      type: "String",
    },
    dietPreference: {
      type: "String",
    },
    no_of_servings: {
      type: "Number",
    },
    servingSize: {
      type: "String",
    },
    ingridents: {
      type: ["Mixed"],
    },
    description: {
      type: ["Mixed"],
    },
  });
const recipes = mongoose.model("recipes", dietSchema);

app.get("/fetch",function(req,res){
    recipes.find(({dietPreference:"Veg"}),function(err,val){
        if(err){
            res.send("error found")
        }else{
            res.send()
            console.log()   
        }
    })
})
app.listen(8080,()=>{
    console.log("on port 8080")
})