const express=require("express")
const router=express.Router()
const fs = require("fs");

const dir="H:\\javascript\\node-project";
router.route("/").get(function (req, res) {
    res.render("employee/createUser.ejs", { phrase: ""})
})
    .post(function (req, res) {
        console.log("cu")
        console.log(req.body)
        // res.send("testnig")
        // return;
        
        let id= Date.now()
        let fName=(req.body.firstName)
        let lName=(req.body.lastName)
        let email=(req.body.email)
        let mobileNumber=(req.body.mobileNumber)
        let dateOfBirth=(req.body.dateOfBirth)
        let gender=(req.body.gender)
        let address=(req.body.address)
        let country=(req.body.country)
        let city=(req.body.city)
        // let otherCity=(req.body.otherCity)
        let skills=[]
        skills.push(req.body.value1)
        skills.push(req.body.value2)
        skills.push(req.body.value3)
        skills.push(req.body.value4)
        skills.push(req.body.value5)
        skills.push(req.body.value6)

        
        if (fName == "" ||fName.trim().length == 0) {
            res.render("employee/createUser.ejs", { phrase: "First Name field must not be empty!" })
        }
        else if(lName == "" ||lName.trim().length == 0) {
            res.render("employee/createUser.ejs", { phrase: "Last Name field must not be empty!" })
        }

        else if (email == "" || email.trim().length == 0) {
            res.render("employee/createUser.ejs", { phrase: "Email field must not be empty!" })

        }
        else if (mobileNumber == "" || mobileNumber.trim().length <10&&mobileNumber>10) {
            res.render("employee/createUser.ejs", { phrase: "mobile Number field must not be empty!" })

        }
        else if(address == "" || address.trim().length == 0) {
            res.render("employee/createUser", { phrase: "Address field must not be empty!" })

        }
       
        else if(city == "" || city.trim().length == 0) {
            res.render("employee/createUser.ejs", { phrase: "City field must not be empty!" })
        
        }else if(country == "" || country.trim().length == 0) {
            res.render("employee/createUser.ejs", { phrase: "Country field must not be empty!" })

        }
        // else if(otherCity == "" || otherCity.trim().length == 0) {
        //     res.render("createUser.ejs", { phrase: "Other city field must not be empty!" })

        // }
        // else if(skills == "" || skills.trim().length == 0) {
        //     res.render("createUser.ejs", { phrase: "skill field must not be empty!" })

        // }

        else {
            fs.readFile(dir + "/data.json", "utf-8", function (err, data) {
                let info = [];
                let check = false;
                console.log(data,typeof(data))
                // return
                if (data.length != 0) {
                    info = JSON.parse(data);
                    
                }
                
                    let user = {
                        id:id,
                        fName:fName,
                        lName:lName,
                        email:email,
                        mobileNumber:mobileNumber,
                        dateOfBirth:dateOfBirth,
                        gender:gender,  
                        address:address,
                        country:country,
                        city:city,
                        // otherCity:otherCity,
                        skills:skills
                    }
                    
                    info.push(user)
                    fs.writeFile(dir + "/data.json", JSON.stringify(info), function (err) {
                        
                            res.render("employee/createUser.ejs", { phrase: 'User Created' })
                            return;
                    
                    })

            })
        }

    })
    // .put((req,res)=>{
    //     res.render("createUser")
    // })

module.exports=router;