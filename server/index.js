const express = require('express');
const sequelize = require('../database/index.js');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const reactDOM = require('react-dom');
const React = require('react');


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

app.get('/results/*', (req, res) => {
  let pollId = req.url.split('/')[2]
  sequelize.models.poll.find({
    where : {
      id: pollId
    },
    include: [{all: true}]
  }).then(poll => {
    let returnObj = {};
    returnObj.pollTitle = poll.dataValues.title;
    returnObj.pollDesc = poll.dataValues.description;
    returnObj.pollId = poll.dataValues.id;
    returnObj.owner = poll.dataValues.user.dataValues.name;
    returnObj.choices = [];

    let choicesArray = poll.dataValues.choices;
    for (let i = 0; i < choicesArray.length; i++) {
      let choiceObject = choicesArray[i].dataValues;
      returnObj.choices.push({
        text: choiceObject.text,
        votes: choiceObject.votes
      });
    }
    
    res.json(returnObj);
  });
});

app.post('/castVote', (req, res) => {
  console.log('&&&pollID', req.body.pollId);
  console.log('*&(*&text', req.body.choiceNumber);
  sequelize.models.choice.increment('votes', {
    where: {
      pollId: req.body.pollId,
      id: req.body.choiceNumber
    }
  }).then(() => {
    console.log('********INCREMEMNTED');
    res.send('Vote counted!');
  });
})

app.get('/*', (req, res) => {
  let pollId = req.url.split('/')[1];

  sequelize.models.poll.find({
    where: {id: pollId},
    include: [{all:true}]
  }).then(poll => {
    if (poll) {
      let returnObj = {};
      returnObj.pollTitle = poll.dataValues.title;
      returnObj.pollDesc = poll.dataValues.description;
      returnObj.pollId = poll.dataValues.id;
      returnObj.owner = poll.dataValues.user.dataValues.name;
      returnObj.choices = [];

      let choicesArray = poll.dataValues.choices;
      for (let i = 0; i < choicesArray.length; i++) {
        let choiceObject = choicesArray[i].dataValues;
        returnObj.choices.push({
          text: choiceObject.text,
          votes: choiceObject.votes,
          id: choiceObject.id
        });
      }
      
      res.json(returnObj);
    }
  });
})

const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}`));