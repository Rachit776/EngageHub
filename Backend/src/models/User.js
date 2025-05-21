import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    fullName:{
        tyep: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlegth:8,
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            tyep:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
}, {timestamps:true});

const User = mongoose.model("User",UserSchema);

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error){
        next(error)
    }
});

export default User;