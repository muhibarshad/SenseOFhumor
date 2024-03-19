const moongose = require('mongoose')
const Validator = require('validator')
const bcrypt = require('bcryptjs');


const userSchema = new moongose.Schema({
    name:{
    type: String,
    require:[true, 'User must have name']
    }, 
    email:{
    type: String,
    require: [true, 'User must have an emial'],
    unique:true,
    trim:true,
    validate:[Validator.isEmail, 'Please Provide the valid email']
    }, 
    password:{
    type:String,
    minlength:8,
    select:false,
    require: [true, 'User must have an password']
    },
    confirmPassword:{
    type:String,
    require: [true, 'User must have an confirm password'],
    validate:{
        validator:function(val){
            return this.password ===val
        }, 
        message:'Both password and confirm password will be same '
    }
    }
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  });
  userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.changedPasswordAt = Date.now() - 1000;
    next();
  });
  userSchema.pre(/^find/, function () {
    this.find({ active: { $ne: false } });
  });
  userSchema.methods.correctPassword = async (candidatePassword, userPasswod) => {
    return await bcrypt.compare(candidatePassword, userPasswod);
  };
  userSchema.methods.changedPasswordVerify = function (jwtTimeStamp) {
    if (this.changedPasswordAt) {
      const changedTime = parseInt(this.changedPasswordAt.getTime() / 1000, 10);
      return jwtTimeStamp < changedTime;
    }
    return false;
  };
  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;
    console.log(this.passwordResetToken, resetToken);
    return resetToken;
  };
const userModel = moongose.model('User', userSchema);

module.exports = userModel