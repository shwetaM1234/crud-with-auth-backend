const db = require("../models");
const Note = db.notes;

exports.read = async (req, res) => {
  try {
    const result = await Note.findAll({order:[["id","DESC"]]});
    if (result && result.length>0) {
      return res
        .status(200)
        .json({ status: 1, message: "success",data:result });
    }
    return res.status(400).json({
      status: 0,
      message: "No record found",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.readById = async (req, res) => {
  const id=req.params.id
  try {
    const result = await Note.findOne({where:{id:id}});
    if (result) {
      return res
        .status(200)
        .json({ status: 1, message: "success",data:result });
    }
    return res.status(400).json({
      status: 0,
      message: "No record found",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
exports.create = async (req, res) => {
  const { name,note} = req.body;
  let obj = { name:name,note:note};
  try {
    const result = await Note.findOne({ where: { name: name } });
    if (result) {
      return res
        .status(200)
        .json({ status: 1, message: "note already exits" });
    }
    const data = await Note.create(obj);
    return res.status(200).json({
      status: 1,
      message: "Created",
      data: {
        note: data,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.updateById = async (req, res) => {
  const id=req.params.id
  const {note}=req.body
  try {
    const result = await Note.findOne({where:{id:id}});
    if (result) {
      await result.update({note:note})
      return res
        .status(200)
        .json({ status: 1, message: "success",data:result });
    }
    return res.status(400).json({
      status: 0,
      message: "No record found",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.deleteById = async (req, res) => {
  const id=req.params.id
  try {
    const result = await Note.findOne({where:{id:id}});
    if (result) {
      await result.destroy()
      return res
        .status(200)
        .json({ status: 1, message: "success",data:result });
    }
    return res.status(400).json({
      status: 0,
      message: "No record found",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};





