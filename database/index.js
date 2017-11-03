const Sequelize = require('sequelize');

const sequelize = new Sequelize('tallyrally', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
.authenticate()
.then(() => {
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
  description: Sequelize.STRING(160)
});

const Choice = sequelize.define('choice', {
  votes: Sequelize.INTEGER
});

Choice.belongsTo(Poll);
Poll.belongsTo(User);

sequelize.sync();

module.exports = sequelize;