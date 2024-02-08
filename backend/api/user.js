import userModel from '../models/userModel.js';

export default function user(server) {
  server.post('/api/user', async (req, res) => {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isClubOwner: req.body.isClubOwner,
    });
    const result = await user.save();
    res.json(result);
  });

  server.get('/api/user', async (req, res) => {
    res.json(await userModel.find());
  });
}
