const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authFuncs = require('../middleware/authentication.js');
const sequelize = require('../../database/index.js');
const saltRounds = 10;

module.exports = {
  authUser: {
    post: (req, res, next) => {
      try {
        // hash pass
        sequelize.models.user.findOne({
          where: {
            name: req.body.name,
          }
        })
          .done((data) => {
            if (!data) {
              return res.status(204).send('User not authenticated');
            }
            
            bcrypt.compare(req.body.password, data.dataValues.password, (e, valid) => {
              if (valid) {
                const token = authFuncs.generateToken({
                  name: data.dataValues.name,
                  id: data.dataValues.id,
                });
                res.status(200).send(token);
              } else {
                return res.status(204).send('User not authenticated');
              }
            })
          })
      }
      catch (error) {
        return res.status(400).send(error);
      }
    }
  },
  createUser: {
    post: (req, res, next) => {

      try {
        // check if user exists
        sequelize.models.user.findOne({
          where: {
            name: req.body.name,
          }
        })
          .done((data) => {
            // return 204 user found if exists
            if (data) {
              return res.status('204').send('User already exists');
            }

            // Hash password
            bcrypt.genSalt(saltRounds, (e, salt) => {
              bcrypt.hash(req.body.password, salt, (e, hash) => {

                // Create a new user
                sequelize.models.user.create({
                  name: req.body.name,
                  password: hash,
                }).then((obj) => {

                  // Sign token and return
                  const token = authFuncs.generateToken({
                    name: obj.dataValues.name,
                    id: obj.dataValues.id,
                  });
                  res.status(200).send(token);
                });
              });
            });
          })
      }
      catch (error) {
        return res.status(400).send(error);
      }
    }
  }
}