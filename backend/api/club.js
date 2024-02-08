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
}
