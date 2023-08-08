const mongoose=require('mongoose');
const{isEmail}=require('validator');
const bcrypt=require('bcrypt');
const e = require('express');


const UserSchema= new mongoose.Schema({

email:{
    type:String,
    required:[true,'Please enter email'],
    unique:true,
    validate:[isEmail,'Please enter valid email']

},
password:{
    type:String,
    required:[true,'Please enter Password'],
    minlength:[6,'Min length is 6']
},

});

UserSchema.post('save',function(doc,next)
{
    console.log('New User created');
    next();


});
UserSchema.pre('save',async function(next)
{
    // console.log('User about to be ceated',this);
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);

    next();
}
);

UserSchema.statics.login=async function(email,password)
{
    const user= await this.findOne({email:email});
    if(user)
    {
       const auth= await bcrypt.compare(password,user.password);
       if(auth)
       {
        return(user);
        // console.log("correct user")
       }
       throw Error('Incorrect Password');
    }
    
        throw Error('Incorrect email');
    
}
const User=mongoose.model('bos',UserSchema);

module.exports=User;