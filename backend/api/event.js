import eventModel from "../models/eventModel.js";

export default function event(server) {
  server.post("/api/event", async (req, res) => {
    const event = new eventModel({
      name: req.body.name,
      description: req.body.description,
      imageURL: req.body.imageURL,
      pricePerTicket: req.body.pricePerTicket,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      tickets: req.body.tickets,
      club: req.body.club,
    });
    const result = await event.save();
    res.json(result);
  });

  server.get("/api/event", async (req, res) => {
    res.json(await eventModel.find());
  });

  server.get("/api/event/:id", async (req, res) => {
    let result = await eventModel.findById(req.params.id);
    if (!result) {
      res.send("Event not found").status(404);
    } else {
      res.send(result).status(200);
    }
  });
}
