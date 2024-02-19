import clubModel from './clubModel.js';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isClubOwner: Boolean,
  bookedEvents: [],
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: clubModel,
  },
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
