const moongose=require('mongoose');


const categorySchema=new moongose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    },

},{timestamps:true})


module.exports=moongose.model("Category",categorySchema);   