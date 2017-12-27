const Sequelize = require('sequelize');

const sequelize = new Sequelize('tallyrally', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    if (error) throw error;
    console.log('Connection successfully established');
  })
  .catch(error => {
    console.error('Error occurred during connection', error);
  });

const User = sequelize.define('user', {
  name: Sequelize.STRING(20)
});

const Poll = sequelize.define('poll', {
  title: Sequelize.STRING(50),
  description: Sequelize.STRING(160),
  link: Sequelize.STRING(5)
});

const Choice = sequelize.define('choice', {
  text: Sequelize.STRING(160),
  votes: Sequelize.INTEGER
});

Choice.belongsTo(Poll);
Poll.belongsTo(User);
User.hasMany(Poll);
Poll.hasMany(Choice);

sequelize.sync();

module.exports = sequelize;