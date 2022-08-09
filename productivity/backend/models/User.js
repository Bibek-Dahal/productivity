import mongoose from "mongoose"
import emailValidator from "../validators/emailValidator.js";
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
const saltRounds = 10;


const userSchema = mongoose.Schema({
    "username":{
        type:String,
        required:true,
        trim:true,
        
    },
 
    "email":{
        type:String,
        unique:true,
        trim:true,
        required:true,
        
        
    },
    "avatar":{
        type: String
      },
    "skills":{
        type: [{
            type: String,
          }],
          validate: [skillsArrayLimit, '{PATH} exceeds the limit of 10']
    },
    "password":{
        type:String,
        required:[true,'the password field is required'],
        minLength:[8,'password must be at least 8 characters'],
    },
    
    "is_admin":{
        type: Boolean,
        default: false
    },

    "is_active":{
        type:Boolean,
        default: false
    }//determines whether user is verified or not
    

},//ends schema defn

{
    timestamps:{
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    },
    
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});



// Specifying a virtual with a `ref` property is how you enable virtual
// population
userSchema.virtual('group', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'user'
});

userSchema.plugin(uniqueValidator,{ message: 'user with {PATH} address already exists.' })

//function for comparing password 

userSchema.statics.checkUser = async function(plaintext,hashedText){
    // console.log('hello static method called')
    // console.log(hashedText)
    const match = await bcrypt.compare(plaintext, hashedText);
    return match


}




///function for hashing password which is called aftre validation
userSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // hash the password using our new salt
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });


});





//checks array size
function skillsArrayLimit(val) {
    return val.length <= 10;
  }

const User = mongoose.model('User',userSchema)
export default User