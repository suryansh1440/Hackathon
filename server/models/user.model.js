import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
    },
    avatar:{
        type: String,
        default: "",
    },
    mobile:{
        type: String,
        default: null,
    },
    refreshToken:{
        type: String,
        default: "",
    },
    verify_email:{
        type: Boolean,
        default: false,
    },
    last_login:{
        type: Date,
        default: null,
    },
    correctAnswer:{
        type: Number,
        default: 0,
    },
    wrongAnswer:{
        type: Number,
        default: 0,
    },
    status:{
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active",
    },
    address_details:[
        {
            
            type:String,
            default:"",
        }
    ],
    forgot_password_otp:{
        type: String,
        default: null,
    },
    forgot_password_expiry:{
        type: Date,
        default: null,
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    courses:{
        type:Schema.ObjectId,
        ref: "Course",
        default: null
    }
    
},{
    timestamps: true,
});

const UserModel = model("User", userSchema);

export default UserModel;