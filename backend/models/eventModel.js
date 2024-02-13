import mongoose from 'mongoose';
import clubModel from './clubModel.js';

const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  imageURL: String,
  pricePerTicket: Number,
  startDate: String,
  endDate: String,
  tickets: Number,
  bookings: [],
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: clubModel,
  },
});

const eventModel = mongoose.model('events', eventSchema);

export default eventModel;
