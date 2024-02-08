import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  user: [],
  event: [],
  numberOfTickets: Number,
});

const bookingModel = mongoose.model('bookings', bookingSchema);

export default bookingModel;
