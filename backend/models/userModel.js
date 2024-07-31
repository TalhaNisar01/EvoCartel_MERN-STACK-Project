const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  },
  profilePic: {
    type: String
  },
  role: {
    type: String,
    default: 'general'
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
}, {
  timestamps: true 
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
