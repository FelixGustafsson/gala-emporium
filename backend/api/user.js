import userModel from "../models/userModel.js";

export default function user(server) {
  server.post("/api/user", async (req, res) => {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isClubOwner: req.body.isClubOwner,
    });
    const result = await user.save();
    res.json({ user: result, message: res.status });
  });

  server.get("/api/user", async (req, res) => {
    res.json(await userModel.find());
  });

  server.post("/api/login", async (req, res) => {
    if (req.session.login) {
      res.json({ message: "User already logged in" });
    } else {
      const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (user) {
        req.session.login = user._id;
        res.json({
          message: `Login as ${user.email} successful`,
        });
      } else {
        res.json({ message: "User not found" });
      }
    }
  });

  server.delete("/api/login", async (req, res) => {
    if (req.session.login) {
      const user = await User.findById(req.session.login);
      delete req.session.login;
      res.json({ message: `Logged you out, ${user.username}` });
    } else {
      res.json({ message: "No one is logged in, you turnip" });
    }
  });
}
