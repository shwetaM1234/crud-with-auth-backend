const db = require("../models");
const User = db.user_data;
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const { name,email,password} = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);
  let obj = { name:name,email:email,password: hashedPassword };
  try {
    const result = await User.findOne({ where: { email: email } });
    if (result) {
      return res
        .status(200)
        .json({ status: 1, message: "User email already exits" });
    }
    const data = await User.create(obj);
    return res.status(200).json({
      status: 1,
      message: "Created",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log( email, password);
    const result = await User.findOne({ where: { email: email } });
    if (!result) {
      return res.status(200).json({ status: 0, message: "User not exits" });
    }
    
    console.log( email, password);
    const validPassword = await bcryptjs.compare(password, result.password);
    if (!validPassword) {
      return res
        .status(200)
        .json({ status: 0, message: "Password is not correct" });
    }
    const token = jwt.sign(
      { email: result.email, name: result.name.toString() },
      "bfnvjfcsdkbsdkjcv",
      { expiresIn: "30m" }
    );
    let data = {
      ...result.dataValues,
      password: "",
    };
    return res.status(200).json({
      status: 1,
      message: "login_success",
      data: {
        token: token,
        user: data,
      },
    });
  } catch (error) {
    console.log( "email", error);
    return res.status(400).json({error});
  }
};


exports.getUserByEmail = async (req, res, email) => {
  try {
    const result = await User.findOne({ where: { email: email } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "User not exits" });
    }
    let data = {
      ...result.dataValues,
      password: "",
    };
    return {
      status: 1,
      data: data,
    };
  } catch (error) {
    return res.send(error);
  }
};

