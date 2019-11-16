const mongoose = require('mongoose');

const userScheama = mongoose.Schema({
    googleID : {type:String},
    facebookID : {type:String},
    twitterID : {type:String},
    linkedinID : {type:String},
    name : {type:String,required:true},
    image:{type:String},
    role:{type:String,default:'user'},
    provider:{type:String},  
    email:{type:String},
    password:{type:String},
    password2:{type:String}    
},{ timestamps: true}
)

module.exports= mongoose.model('social_user',userScheama)