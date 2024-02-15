import bookingModel from "../models/bookingModel.js";
import eventModel from "../models/eventModel.js";
import userModel from "../models/userModel.js";

export default function club(server) {
  server.post("/api/booking/:id", async (req, res) => {
    const event = await eventModel.findById(req.params.id);
    if (event.tickets >= req.body.numberOfTickets) {
      const booking = new bookingModel({
        user: req.body.user,
        event: req.body.event,
        numberOfTickets: req.body.numberOfTickets,
      });
      const result = await booking.save();
      event.tickets -= req.body.numberOfTickets;
      event.save();
      const user = await userModel.findById(req.body.user);
      user.bookedEvents.push(booking);
      user.save();
      res.json(result);
    } else {
      res.json({ message: "Out of tickets" });
    }
  });

  server.delete("/api/booking/:id", async (req, res) => {
    //finds the booking and the user
    const booking = await bookingModel.findById(req.params.id);
    const user = await userModel.findById(booking.user[0]);
    //at the moment, there is no code to remove the booking from the user's bookedEvents array
    // code needed here

    //the code below removes the booking object
    const cancellation = await bookingModel.findByIdAndDelete({
      _id: req.params.id,
    });
    await res.json(cancellation);
  });
}
