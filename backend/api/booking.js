import bookingModel from "../models/bookingModel.js";
import eventModel from "../models/eventModel.js";

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
      res.json(result);
    } else {
      res.json({ message: "Out of tickets" });
    }
  });
}
