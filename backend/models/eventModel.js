import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  imageURL: String,
  pricePerTicket: Number,
  startDate: String,
  endDate: String,
  tickets: Number,
  bookings: [],
  club: [],
});

const eventModel = mongoose.model('events', eventSchema);

export default eventModel;
