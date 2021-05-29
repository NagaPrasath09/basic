const bodyParser = require("body-parser");
const { response } = require("express");
const express=require("express");
const app=express()
const fs=require("fs");

app.use(bodyParser.json());


app.listen(5000,()=>{
    console.log("Running at 5000");
})

app.get("/get", (req,res) =>{
    let rawData= fs.readFileSync('coupon.json');
    let coupon=JSON.parse(rawData);
    let amount=0
    for (var i=0; i<coupon.length; i++){
        val = coupon[i];
        if(val.code==req.body.code){
            amount = val.amount;
            break;
        }
    }
    if(amount == 0 ){
        return res.json({message: "coupon code unavailable"});
    }else{
        var cartVal = req.body.amount;
        cartVal = cartVal-amount
        return res.json({Final_value: cartVal})
    }
})

app.post("/coupon/add",(req,res)=>{
   let rawData= fs.readFileSync('coupon.json');
   let coupon=JSON.parse(rawData);
   let flag=false
   for (var i=0; i<coupon.length; i++){
       val = coupon[i];
       if(val.code==req.body.code){
           flag =  true;
           break;
       }
   }
   console.log(flag);
   if(flag==false){
        coupon.push(req.body)
        fs.writeFile('coupon.json',JSON.stringify(coupon),(err)=>{
       if(err){
            return res.json({error:err});
       }else{
            return res.json(coupon)
       }
        })  
    }else{
      return res.json({message:"Coupon code is already available"})
    }
});
