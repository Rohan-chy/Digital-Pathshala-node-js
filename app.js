const express=require('express');
const app=express();
const bcrypt=require('bcryptjs')

const {clients}= require("./model/index")
const {courses}= require("./model/index")
//database connection
require('./model/index')
const statData=require('./model/data')

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs');
app.use(express.static("assets/"))

//register
app.get('/',(req,res)=>{
    res.render('register')
})
app.post('/',async(req,res)=>{
    const {email,password,confirmpassword}=req.body;

    if(!email || !password || !confirmpassword){
        res.send("please enter email and password")
    }else if(password !== confirmpassword){
        res.send("match not matched")
    }else{
        const data=await clients.findAll({
            where:{
                email:email
            }
        })
        if(data.length > 0){
            res.send("email is already used")
        }
        else{
            await clients.create({
                email:email,
                password:bcrypt.hashSync(password,8),
                confirmpassword:bcrypt.hashSync(confirmpassword,8)
            })
            res.redirect('/login');
        }
    }
})
//login
app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const data=await clients.findAll({
        where:{
            email:email
        }
    })
    if(data.length > 0){
        const passwordCheck=bcrypt.compareSync(password,data[0].password)
        if(passwordCheck){
            res.redirect('/demo')
        }
        else{
            res.send("wrong password")
        }
    }
    else{
        res.send("invalid email or password")
    }
})




//index page
app.get('/demo',(req,res)=>{
    
    res.render('demo',{statData}) 
})


var name,type;
app.post('/demo',(req,res)=>{
    name=req.body.courseName;
    type=req.body.courseType;
    res.redirect('/enroll1')
})
app.get('/enroll1',(req,res)=>{
    res.render('enroll1',{name,type})
})

//create
app.post('/create',async(req,res)=>{
    const {courseName,courseType}=req.body;
    await courses.create({
        courseName:courseName,
        courseType:courseType
    })
    res.redirect('/learning')
})
//my learning read
app.get('/learning',async(req,res)=>{
    const courseData=await courses.findAll(); 
    res.render("learning",{courseData})
})

//delete
app.get('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    await courses.destroy({
        where:{
            id:id
        }
    })
    res.redirect('/learning')
})

//update
app.get('/update/:id',async(req,res)=>{
    const {id}=req.params;
    const dynamicData=await courses.findAll({
        where:{
            id:id
        }
    })
    res.render('update',{dynamicData})
})

app.post('/update/:id',async(req,res)=>{
    const {id}=req.params;
    const {courseName,courseType}=req.body;

    await courses.update({
        courseName:courseName,
        courseType:courseType
    },{
        where:{
            id:id
        }
    })
    res.redirect('/learning')
})

app.listen(5000,function(){
    console.log("port started at 5000");
})