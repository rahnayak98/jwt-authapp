const User= require('../Models/User');
const jwt=require('jsonwebtoken');


const maxage=3*24*60*60;
const createtoken=(id)=>{
    return jwt.sign({id },'rrnyak bosds',{
        expiresIn:maxage 
    })
}

module.exports.signup_get=(req,res)=>
{
    res.render('signup');
}

module.exports.login_get=(req,res)=>
{
    res.render('login');
}


module.exports.signup_post=async (req,res)=>
{
    const{email,password}=req.body;
    try{
       const user= await User.create({email,password});
       const token=createtoken(user._id);
       res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
       res.status(201).json({user:user._id});

    }
    catch(err){ 
        console.log(err);
        // const errors=handleerrors(err)
        // console.log(errors);
         res.status(400).send(err);
    }

    // res.send('New Signup')
}

module.exports.login_post=async(req,res)=>
{
       const{email,password}=await req.body;
       try {
        const user=await User.login(email,password);
        // const token=createtoken(user._id);
        // res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
        res.status(200).json({user:user._id});

       } catch (error) {
        res.status(401).send(error);


       }

    // res.send('User Login')
}