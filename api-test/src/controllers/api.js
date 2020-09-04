'use strict'
let mongoConnection = require('../db');
const bcrypt = require('bcrypt');
const validator = require('validator');

//Models
const User = require('../models/user');

//Services
var jwt = require('../services/jwt');


// Login
function loginUser(req, res) {

  var params = req.body;

  let validEmail = !validator.isEmpty(params.email) && validator.isEmail(params.email);
  let validPass = !validator.isEmpty(params.pass);

  if (!validEmail || !validPass) {
    return res.status(200).send({
      suscess: false,
      error: true,
      message: 'Datos incorrectos' })
  } else {
    User.findOne({ email: params.email }, (err, user) => {
      if (err) return res.status(500).send({ 
        suscess: false,
        error: true,
        message: 'Error de proceso'
      })
      if (user) {
        bcrypt.compare(params.pass, user.pass, (err, check) => {
          if (check) {
            return res.status(200).send({
              suscess: true,
              error: false,
              data:{
                id: user._id,
                name: user.name,
                token: jwt.createToken(user)
              }
            })
          } else {
            return res.status(404).send({
              suscess: false,
              error: true,
              message: 'Error password' })
          }
        });
      } else {
        return res.status(404).send({
          suscess: false,
          error: true,
          message: 'Error email'
        })
      }
    });
  }

}

// Add User
function addUser(req, res) {
  var params = req.body;
  var user = new User();

  if (params.name && params.email && params.pass) {

    user.name = params.name;
    user.email = params.email;
    user.pass = params.pass;

    /// Verify duplicated user
    User.find({
      $or: [
        { email: user.email.toLowerCase() }
      ]
    }).exec((err, users) => {

      if (err) return res.status(500).send({
        suscess: false,
        error: true,
        message: 'Error de proceso'
      })

      if (users && users.length >= 1) {
        return res.status(200).send({
          suscess: true,
          error: null,
          message: 'Usuario duplicado'
        })
      } else {
        // Crypt pass and save data
        bcrypt.hash(params.pass, 10, (err, hash) => {
          user.pass = hash;

          user.save((err, userStored) => {
            if (err)
              return res.status(500).send({
                suscess: false,
                error: true,
                message: 'Error de proceso'
              })
            if (userStored) {
              res.status(200).send({
                suscess: true,
                error: false,
                id: userStored._id,
                message: "Usuario creado"
              });
            } else {
              res.status(404).send({
                suscess: false,
                error: true,
                message: 'Usuario no creado'
              });
            }
          });

        });
      }
    });

  } else {
    res.status(200).send({
      suscess: false,
      error: true,
      message: 'Todos los campos son requeridos.'
    });
  }

}

module.exports = {
  addUser,
  loginUser
}
