const express = require("express")
const app = express();
const session = require('express-session')
const port = 5000;

// app.set('views', path.join(__dirname, 'views'));

//importing routes
const loginRoute = require('./routes/login')
const homeRoute = require('./routes/home')
const createUserRoute = require('./routes/createUser')
const searchUserRoute = require('./routes/searchUser')
const updateUserRoute = require('./routes/updateUser')

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'))


const checkAuth = require('./middlewares/checkAuth')

// using routes
app.use("/login", loginRoute);
app.use("/home", checkAuth, homeRoute);
app.use("/createUser",checkAuth, createUserRoute);
app.use("/searchUser",checkAuth, searchUserRoute);
app.use("/updateUser",checkAuth ,updateUserRoute);
// app.use("/searchUser", searchUserRoute);


app.route('/')
.get((req,res)=>{
    res.render('login',{phrase:""});
})
.post((req,res)=>{
    res.send("hi this is post")
})


app.route('/more/multipleTabs').get(checkAuth,(req,res)=>{
    res.render('more/multipleTabs');
})
app.route('/more/menus').get(checkAuth,(req,res)=>{
    res.render('more/menus');
})
app.route('/more/autoComplete').get(checkAuth,(req,res)=>{
    res.render('more/autoComplete');
})
app.route('/more/collapse').get(checkAuth,(req,res)=>{
    res.render('more/collapsibleContent');
})
app.route('/more/uploadImage').get(checkAuth,(req,res)=>{
    res.render('more/uploadImages');
})
app.route('/more/slider').get(checkAuth,(req,res)=>{
    res.render('more/slider');
})
app.route('/more/tooltips').get(checkAuth,(req,res)=>{
    res.render('more/tooltips');
})
app.route('/more/popups').get(checkAuth,(req,res)=>{
    res.render('more/popups');
})
app.route('/more/links').get(checkAuth,(req,res)=>{
    res.render('more/links');
})
app.route('/more/cssProperties').get(checkAuth,(req,res)=>{
    res.render('more/cssProperties');
})
app.route('/more/iFrames').get(checkAuth,(req,res)=>{
    res.render('more/iFrames');
})



app.get('/logout',(req,res)=>{
    if(req.session.is_logged_in){
        console.log("/logout")
        req.session.destroy();
        res.render('login',{phrase:"Logged out!"})
    }
    else{
        res.render('login',{phrase:"Login first!"})
    }
})

app.route('*')
.get((req,res)=>{
    // res.send("404, not foubd")
    res.render("404")
})
.post((req,res)=>{
    // res.send("404, not found")
    res.render("404")
})

app.listen(port, (error)=>{
    if(!error) console.log("app running at : local host ", port);
    else console.log("error :",error);
})