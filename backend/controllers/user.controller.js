const bcrypt = require("bcrypt");
const jwt = require("../utils/JWTGenerateToken");
const config = require("../config");
const User = require("../models/users.model");
const userRoles = require("../utils/userRolels");
const mongoose = require("mongoose");

module.exports.signUp = async (req, res) => {
  let { firstname, lastname, email, password, role } = req.body;
  password = bcrypt.hashSync(password + config.password, parseInt(config.salt));
  const e = await User.find({ email });
  if (e.length !== 0) {
    return res.status(409).json({ message: "User found. Please login." });
  }

  role = role || userRoles.USER;
  const user = new User({ firstname, lastname, email, password, role });

  const token = await jwt({
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    id: user._id,
    role: user.role,
  });
  user.token = token;
  await user
    .save()
    .then((e) => {
      e.password = undefined;
      return res.status(200).json(e);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(401).json({ error: err.message });
    });
};

module.exports.get_users = async (req, res) => {
  await User.find()
    .then((e) => {
      return res.status(200).json(e);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(404).json({ error: err.message });
    });
};

module.exports.login = async (req, res) => {
  let { email, password } = req.body;
  await User.find({ email }).then((e) => {
    if (Object.keys(e).length === 0) {
      return res
        .status(404)
        .json({ message: "Email not found. Please sign up." });
    } else {
      const iseq = bcrypt.compareSync(
        `${password}${config.password}`,
        e[0].password
      );
      e[0].password = undefined;
      const user = {
        id: e[0]._id,
        role: e[0].role,
        email: e[0].email,
        firstname: e[0].firstname,
        lastname: e[0].lastname,
      };
      const token = jwt(user, config.password, { expiresIn: "30d" });
      if (!iseq) {
        return res.status(401).json({ message: "Incorrect password." });
      } else {
        return res.status(200).json({ ...e[0], token });
      }
    }
  });
};

module.exports.delete_user = async (req, res) => {
  let { _id } = req.params;
  _id = new mongoose.Types.ObjectId(_id);
  await User.findByIdAndDelete({ _id })
    .then((e) => {
      if (e) return res.status(200).json(e);
      else return res.status(404).json("user not found");
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(403).json({ error: err.message });
    });
};

module.exports.delete_users_by_email = async (req, res) => {
  let { email } = req.body;
  await User.deleteMany({ email: email })
    .then((e) => {
      if (e) return res.status(200).json(e);
      else return res.status(404).json("user not found");
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(403).json({ error: err.message });
    });
};
