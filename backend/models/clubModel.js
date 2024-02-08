import mongoose from 'mongoose';

const clubSchema = mongoose.Schema({
  name: String,
  description: String,
  imageURL: String,
  colorTheme: Number,
});

const clubModel = mongoose.model('clubs', clubSchema);

export default clubModel;
