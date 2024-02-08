import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isClubOwner: Boolean,
  bookedEvents: [],
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
