const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    if (req.file) req.body.image = req.file.filename
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: password,
        confirmed: false,
        image: req.file?.filename
      });
      const emailToken = jwt.sign({email:req.body.email},process.env.JWT_SECRET,{expiresIn:'48h'})
      const url = 'http://localhost:8080/users/confirm/'+ emailToken
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<img src="https://i.pinimg.com/originals/00/ee/c3/00eec37e1375aa1ebf238c59b54ad6ab.jpg" alt="Funny image">
        <br>
        <h2>Estás a un paso de registrarte 🚶​ </h2>
        <h2><a href="${url}">👉 ​​Click aqui para confirmar tu registro 👈</a></h2>
        `,
      });
      res.status(201).send({
        message: "Te hemos enviado un correo para confirmar el registro",
        user,
      });
    } catch (err) {
      err.origin = "User";
      console.log(err)
      next(err); 
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken
       const payload = jwt.verify(token,process.env.JWT_SECRET)
         await User.updateOne(
        { email:payload.email },
        
        {
         confirmed: true,
        }
      );

      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send("correo o contraseña incorrectos");
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }
      const isMatch = bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("correo o contraseña incorrectos");
      }
      const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.find();
      res.send({ message: "Sus usuario", user });
    } catch (error) {
      console.error(error);
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate("postIds")
        .populate("likes")
        .populate("commentIds");
        res.send({ msg: "su usuario", user });
    } catch (error) {
      console.error(error);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "Usuario actualizado " });
    } catch (error) {
      console.error(error);
    }
  },
  async getUserByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const name = new RegExp(req.params.name, "i");
      const user = await User.find({ name });
      res.send({ msg: "su usuario", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al traernos el usuario",
        error,
      });
    } },
    async getUserById(req, res) {
      try {
        const user = await User.findById(req.params._id)
        res.send({ message: "Su Usuario", user });
      } catch (err) {
        res.status(500).send({ msg: "Su Usuario no existe", err });
      }
    },
  async followers(req, res) {
    try {
      const existUser = await User.findById(req.params._id);
      if (!existUser.followers.includes(req.user._id)) {
        const user = await User.findByIdAndUpdate(
          req.params._id,
          { $push: { followers: req.user._id } },
          { new: true }
        );

        await User.findByIdAndUpdate(req.user._id, {
         $push: { seguidos: req.params._id}
        });
        res
          .status(400)
          .send({ message: "enhorabuena estas siguiendo a", user:user.name });
      } else {
        res.status(400).send({ message: "Ey ya sigues a este usuario :)" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "hay un problema con tu like" });
    }
  },
  async unfollow(req, res) {
    try {
      await User.findByIdAndUpdate(req.params._id, {
        $pull: { followers: req.user._id }
      
      });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { seguidos: req.params._id }, 
      
      });
      res.send({ message: "Ya no sigues a este usuario" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar quitar tu follow",
      });
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.send({ message: "Usuario eliminado", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hay un problema al tratar de eliminar el usuario",
      });
    }
  }

};

module.exports = UserController;
