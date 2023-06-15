const express=require("express")
const router=express.Router()
const app=express()
const path = require('path')
const fs = require("fs");

const dir="H:\\javascript\\node-project";
router
.get(("/"),function (req, res) {
    
    // res.render("searchUser.ejs", { noUser: false, data:[{key1:"kay1",key2:"key2",key3:"key3"}, {key1:"kay1",key2:"key2",key3:"key3"},{key1:"kay1",key2:"key2",key3:"key3"}]})
    let info=[];
    fs.readFile(path.join(__dirname,'..','data.json'), "utf-8", function (err, data){
        // console.log(data,typeof data)
        info = JSON.parse(data);
        // console.log(data,typeof data)
        // console.log(data[0].fName, typeof(data[0].fName))
        res.render("employee/searchUser.ejs", { noUser: false, data: info})
    })
})
    .post(("/"), (req, res) =>{
        console.log(req.body)
        // res.send("testnig")
        // return;
        
        // let id= Date.now()
        let name=(req.body.name)
        let mobile=(req.body.mobile)

        if(mobile==""&&name==""){
            console.log("if")
            let info=[]
            // let noUser = false;
            fs.readFile(path.join(__dirname,'..','data.json'), "utf-8", (err, data)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                    info = JSON.parse(data)
                    // for(let i=0;i<data.length;i++){
                    //     info.push(data[i]);
                    // }
                    res.json({noUser: false, data: info});
                    return;
                }
                
            })
        }
        else if(mobile=="" && name!=""){
            console.log("elseif 1")
            let info=[];
            fs.readFile(path.join(__dirname,'..','data.json'), "utf-8", function (err, data){
                console.log(data,typeof data)
                data = JSON.parse(data);
                console.log(data,typeof data)
                console.log(data[0].fName, typeof(data[0].fName))
                for(let i=0;i<data.length;i++){
                    if(data[i].fName.includes(name)){
                        info.push(data[i]);
                    }
                }
                console.log(info,"<<<",info.length)
                if(info.length==0){
                    console.log("here")
                    res.json({noUser:true, data:null});
                }
                else{
                    res.json({noUser:false, data:info});
                }
            })
        }
        else if(mobile!=""&&name==""){
            console.log("else if 2")
            fs.readFile(__dirname + "/data.json", "utf-8", function (err, data){
                // console.log(data)
                data = JSON.parse(data)
                let info=[];
                for(let i=0;i<data.length;i++){
                    if(data[i].mobileNumber.search(mobile)!=-1){
                        info.push(data[i]);
                    }
                }
                if(info.length==0){
                    res.json({noUser:true, data:null});
                }
                else{
                    res.json({noUser:false, data:info});
                }
            })
        }
        else{
            console.log("else")
            res.json({noUser:true , data: null});
        }

    })
.delete('/',(req,res)=>{
    // console.log(req.body)
    fs.readFile(path.join(__dirname,'..','data.json'),'utf-8',(err,data)=>{
        if(data.length == 0) info =[]
        else info = JSON.parse(data);

        for(let i=0; i < info.length;i++){
            if(info[i].id == req.body.id){
                info.splice(i,1);
                // console.log("splice")
                break;
            }
        }

        fs.writeFile(path.join(__dirname,'..','data.json'),JSON.stringify(info),(err)=>{
            if(err) res.json({msg:"error in writing data.json",success:false})
            else res.json({msg:'info delete req',success:true})
            return;
        })
    })
})
.put('/',(req,res)=>{
    // console.log(req.body)
    // res.redirect('/createUser')

    fs.readFile(path.join(__dirname,'..','data.json'),'utf-8',(err,data)=>{
        if(data.length == 0) info =[]
        else info = JSON.parse(data);
        for(let i=0; i < info.length;i++){
            if(info[i].id == req.body.id){
                
                res.render('employee/updateUser',{obj:info[i],phrase:""})
                return;
            }
        }
        res.send("something wrong happened")
        
    })

    

})
    module.exports=router;
