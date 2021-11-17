import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jion = async (req, res) => {
  const { ID, password, Name, Email, Phone, Address } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hasspw = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      ID: ID,
      password: hasspw,
      Name: Name,
      Email: Email,
      Phone: Phone,
      Address: Address,
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
const login = async (req, res) => {
  const { ID, password } = req.body;

  try {
    const user = await User.findOne({
      where: { ID },
    });
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (isAuthenticated) {
      console.log(process.env.ACCESS_TOKEN_SECRET);
      const token = jwt.sign(
        {
          Name: user.Name,
          Email: user.Email,
          ID: user.ID,
        },
        "Access_Token_Secret_#$%_ExpressJS_Authentication",
        { expiresIn: "1h" }
      );
      const customer = {
        Name: user.Name,
        Email: user.Email,
        ID: user.ID,
        Phone: user.Phone,
        Address: user.Address,
        Emoji: user.Emoji,
      };
      res.status(200).send({
        message: "Đăng nhập thành công",
        token,
        customer,
      });
    } else {
      res.status(403).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    res.status(403).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
  }
};
const uploadImgUser = async (req, res) => {
  const { ID } = req.user;
  const file = req.file;
  const url = `http://localhost:5000/${file.path}`;
  try {
    const img_path = await User.findOne({
      where: { ID },
    });
    img_path.Emoji = url;
    await img_path.save();
    res.status(200).send(img_path);
  } catch (error) {
    req.status(500).send(error);
  }
};
const getListUser = async (req, res) => {
  try {
    const listUser = await User.findAll();
    res.status(200).send(listUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    await User.destroy({
      where: {
        ID: id,
      },
    });
    const listUser = await User.findAll();
    res.status(200).send(listUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateUser = async (req, res) => {
  const { ID, password, Name, Email, Phone, Address } = req.body;
  const id = req.user.ID;
  try {
    await User.update({ Name, Email, Phone, Address }, { where: { ID: id } });
    const user = await User.findOne({
      where: { ID },
    });
    res.status(200).send({ message: "Update successfully!", user });
  } catch (error) {
    res.status(500).send(error);
  }
};
export { jion, uploadImgUser, login, updateUser, getListUser, deleteUser };
