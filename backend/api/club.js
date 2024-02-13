import clubModel from '../models/clubModel.js';

export default function club(server) {
  server.post('/api/club', async (req, res) => {
    const club = new clubModel({
      name: req.body.name,
      description: req.body.description,
      imageURL: req.body.imageURL,
      colorTheme: req.body.colorTheme,
    });
    const result = await club.save();
    res.json(result);
  });

  server.get('/api/club/:id', async (req, res) => {
    let result = await clubModel.findById(req.params.id);
    if (!result) {
      res.send("Club doesn't exist").status(404)
    } else { res.send(result).status(200) }
  })

  server.get('/api/clubs', async (req, res) => {
    res.json(await clubModel.find());
  });
}
