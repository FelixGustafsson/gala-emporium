import bookingModel from '../models/bookingModel.js';
import eventModel from '../models/eventModel.js';
import userModel from '../models/userModel.js';

export default function club(server) {
  //posting a new booking
  server.post('/api/booking/:id', async (req, res) => {
    //Finding the event tthat the user wants to book
    const event = await eventModel.findById(req.params.id);
    //Checks to see if there's enough tickets left
    if (event.tickets >= req.body.numberOfTickets) {
      //If there's enough tickets we create a new booking object
      const booking = new bookingModel({
        user: req.body.user,
        event: req.body.event,
        numberOfTickets: req.body.numberOfTickets,
      });
      //Send the new booking to the database and decrease available tickets from the event
      const result = await booking.save();
      event.tickets -= req.body.numberOfTickets;
      event.save();
      //Add the booking to the user
      const user = await userModel.findById(req.body.user);
      user.bookedEvents.push(booking);
      user.save();
      res.json(result);
    } else {
      res.json({ message: 'Out of tickets' });
    }
  });

  //Deletes a booking
  server.delete('/api/booking/:id', async (req, res) => {
    //Finds the booking and the user
    const booking = await bookingModel.findById(req.params.id);
    const event = await eventModel.findById(booking.event[0]);
    const user = await userModel.findById(booking.user[0]);

    let array = user.bookedEvents;
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i]._id == req.params.id) {
        let tickets = array[i].numberOfTickets;
        console.log(tickets);
        console.log(event.tickets);
        event.tickets += tickets;
        event.save();
        array.splice(i, 1);
      }
    }
    user.save();
    const cancellation = await bookingModel.findByIdAndDelete({
      _id: req.params.id,
    });
    await res.json(cancellation);
  });
}
