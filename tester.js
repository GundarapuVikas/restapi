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
//SCHEMA

const sch=mongoose.Schema(
    {
        
          "userId": {
            "type": "object",
            "properties": {
              "$oid": {
                "type": "string"
              }
            },
            "required": [
              "$oid"
            ]
          },
          "gender": {
            "type": "string"
          },
          "height": {
            "type": "number"
          },
          "weight": {
            "type": "number"
          },
          "age": {
            "type": "number"
          },
          "sleep": {
            "type": "string"
          },
          "physicalActivities": {
            "type": "string"
          },
          "activityLevel": {
            "type": "string"
          },
          "dietPref": {
            "type": "string"
          },
          "goal": {
            "type": "string"
          },
          "allergies": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "breakfast": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "lunchDinner": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "snacks": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "water": {
            "type": "string"
          },
          "healthConditions": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
    }
)
const monmodel=mongoose.model("userforms",sch);

//FETCH/GET
app.get("/fetch/:id",function(req,res){
    let uid=req.params.id;
    monmodel.find(({_id:uid}),function(err,val){
        if(err){
            res.send("error found")
        }else{
            if(val.length==0){
                res.send("no data found in db")
            }
            else{
              res.send("user details sent to terminal");
              console.log("user details");
              console.log(val);
              var weight=val[0].weight;
              var height=val[0].height;
              var age=val[0].age;
              var bmi=weight/(height/100)**2;
              if(val.gender=="Male"){
                var BMR=(10*weight)+(6.25*height)+(5*age)+5;
              }
              else{
                var BMR=(10*weight)+(6.25*height)+(5*age)+5;
              }
              var pact=0;
              if(val[0].physicalActivities=="Highly active"){
                pact=2.4;
              }
              else if(val[0].physicalActivities=="Moderatly active"){
                pact=1.8;
              }
              else{
                pact=1.2;
              }
              var lact=0;
              if(val[0].activityLevel=="Light"){
                lact=1.4;
              }
              else if(val[0].activityLevel=="Very Light"){
                lact=1.2;
              }
              else if(val[0].activityLevel=="Moderate"){
                lact=1.6;
              }
              else{
                lact=2;
              }
              var act_res=(pact+lact)/2;
              var TDEE=BMR*act_res;
            
              var total_cal_req=0;
              if(val[0].goal=="WeightGain"){
                if(TDEE+500<=2400){
                  total_cal_req=TDEE+500;
                }
                else{
                  total_cal_req=2400;
                }
              }
              else if(val[0].goal=="WeightLoss"){
                if(bmi>=25 && TDEE>=2100){
                  total_cal_req=TDEE-500;
                }
                else{
                  if(bmi>=25 && TDEE<2100){
                    total_cal_req=1600;
                  }
                  else{
                    if(bmi<25){
                      total_cal_req=TDEE-300;
                    }
                  }
                }
              }
              else{
                if(bmi<18){
                  if(TDEE+500<=2400){
                    total_cal_req=TDEE+500;
                  }
                  else{
                    total_cal_req=2400;
                  }
                }
                else if(bmi>25){
                  //weight loss
                  if(bmi>=25 && TDEE>=2100){
                    total_cal_req=TDEE-500;
                  }
                  else{
                    if(bmi>=25 && TDEE<2100){
                      total_cal_req=1600;
                    }
                    else{
                      if(bmi<25){
                        total_cal_req=TDEE-300;
                      }
                    }
                  }
                }
                else{
                  total_cal_req=TDEE;
                }
              }
            }
            console.log("total calories per day: "+(Math.round(total_cal_req/100)*100))
        }
    })
})
app.listen(3000,()=>{
    console.log("on port 3000")
})
