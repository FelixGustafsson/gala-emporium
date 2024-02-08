import eventModel from '../models/eventModel.js';

export default function event(server) {
  server.post('/api/event', async (req, res) => {
    const event = new eventModel({
      name: req.body.name,
      description: req.body.description,
      imageURL: req.body.imageURL,
      pricePerTicket: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tickets: req.body.tickets,
    });
    const result = await event.save();
    res.json(result);
  });
}
