import mongoose from "mongoose"
import emailValidator from "../validators/emailValidator.js";
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
const saltRounds = 10;


const userSchema = mongoose.Schema({
    "first_name":{
        type:String,
        required:[true,'the first name field is required'],
        trim:true,
        maxLength:[30, 'Must be at most 30, got {VALUE}'],
        minLength:[3, 'Must be at least 3, got {VALUE}']
    },
    "middle_name":{
        type:String,
        trim:true,
        maxLength:[30, 'Must be at most 30, got {VALUE}'],
    },
    "last_name":{
        type:String,
        required:[true,'the last name field is required'],
        trim:true,
        maxLength:[30, 'Must be at most 30, got {VALUE}'],
        minLength:[3, 'Must be at least 3, got {VALUE}']
    },
    "email":{
        type:String,
        unique:[true,'user with email already exists'],
        trim:true,
        required:[true,'the email field is required'],
        maxLength:[100,'Must be at most 30, got {VALUE}'],
        validate: {
            validator: emailValidator,
            message: props => `please enter valid email address`
          },
        
    },
    "avatar":{
        type: [{
          type: String,
        }],
        validate: [skillsArrayLimit, '{PATH} exceeds the limit of 10']
      },
    "skills":{
        type:Array

    },
    "password":{
        type:String,
        required:[true,'the password field is required'],
        maxLength:[200,'characters more then 150 are not allowed'],
        minLength:[8,'password must be at least 8 characters'],
        validate: {
            validator: function(v) {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/;
                return re.test(v)
            },
            message: props => 'password must contain at least one digit,one special character and one uppercase letter'
          },
    },
    "is_admin":{
        type:Boolean,
        default:false
    },
    

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