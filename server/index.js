const express = require('express');
const sequelize = require('../database/index.js');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist/'));

app.get('/polls', (req, res) => {
  sequelize.models.poll.findAll({
    where: {},
    include: [{all: true}]
  }).done((data) => {
    const pollData = [];
    for (let i = 0; i < data.length; i++){
      let info = data[i].dataValues;
      let tempPollData = {};
      tempPollData.owner = info.user.dataValues.name;
      tempPollData.pollTitle = info.title;
      tempPollData.pollDesc = info.description;
      tempPollData.pollId = info.id;
      tempPollData.choices = [];
      
      for (let j = 0; j < info.choices.length; j++) {
        let tempChoiceData = {
          text: info.choices[j].dataValues.text,
          votes: info.choices[j].dataValues.votes
        };
        tempPollData.choices.push(tempChoiceData);
      }

      pollData.push(tempPollData);
    }
    
    res.json(pollData.reverse());
  });
});

app.post('/polls', (req, res) => {

  let link;

  sequelize.models.user.findOrCreate({
    where: {
      name: req.body.owner
    }
  }).then((user) => {
    sequelize.models.poll.create({
      title: req.body.pollTitle,
      description: req.body.pollDesc,
      userId: user[0].dataValues.id
    }).then((poll) => {
      link = poll.dataValues.id;
      for (let i = 0; i < req.body.choices.length; i++) {
        sequelize.models.choice.create({
          text: req.body.choices[i],
          votes: 0,
          pollId: poll.dataValues.id
        });
      }
    }).done(() => {
      res.json(link);
    });
  });
});

const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}`));