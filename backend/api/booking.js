import bookingModel from "../models/bookingModel.js";

export default function club(server) {
  server.post("/api/booking/:id", async (req, res) => {
    const booking = new bookingModel({
      user: req.body.user,
      event: req.body.event,
      numberOfTickets: req.body.numberOfTickets,
    });
    const result = await booking.save();
    res.json(result);
  });
}
