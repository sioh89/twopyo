const _ = require('underscore');
const sequelize = require('../../database/index.js')
const randomWords = require('random-words');

const getUniqueLink = function(callback) {
  const tempLink = randomWords({
    min: 1,
    max: 3,
    join: '-',
  });

  sequelize.models.poll.findOne({
    where: {link: tempLink}
  })
  .then(found => {
    if (found) {
      getUniqueLink(callback);
    } else {
      callback(tempLink);
    }
  });
};

module.exports = {
  polls: {
    get: (req, res, next) => {
      sequelize.models.poll.findAll({
        where: {userId: req.userInfo.id},
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
          tempPollData.pollLink = info.link;
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
    },

    post: (req, res, next) => {
      
      getUniqueLink((uniqueLink) => {
        console.log('@@@@@@@@')
        console.log('title: ', req.body.pollTitle);
        console.log('description: ', req.body.pollDesc);
        console.log('userId: ', req.userInfo.id);
        console.log('link: ', uniqueLink);
        sequelize.models.poll.create({
          title: _.escape(req.body.pollTitle),
          description: _.escape(req.body.pollDesc),
          userId: req.userInfo.id,
          link: uniqueLink,
        }).then((poll) => {
          link = poll.dataValues.id;
          for (let i = 0; i < req.body.choices.length; i++) {
            sequelize.models.choice.create({
              text: _.escape(req.body.choices[i]),
              votes: 0,
              pollId: poll.dataValues.id
            });
          }
        }).done(() => {
          console.log('-------', uniqueLink);
          res.json(uniqueLink);
        });
      });
    }
  },

  results: {

    post: (req, res, next) => {
      let pollLink = req.body.pollLink;
      sequelize.models.poll.find({
        where : {
          link: pollLink
        },
        include: [{all: true}]
      }).then(poll => {
        let returnObj = {};
        returnObj.pollTitle = poll.dataValues.title;
        returnObj.pollDesc = poll.dataValues.description;
        returnObj.pollId = poll.dataValues.id;
        returnObj.pollLink = poll.dataValues.link;
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

        returnObj.choices.sort((a, b) => {
          return b.votes - a.votes;
        });
        
        res.json(returnObj);
      });
    }
  },

  castVote: {
    post: (req, res, next) => {
      console.log('&&&pollID', req.body.pollId);
      console.log('*&(*&text', req.body.choiceNumber);
      sequelize.models.choice.increment('votes', {
        where: {
          id: req.body.choiceNumber
        }
      }).then(() => {
        console.log('********INCREMEMNTED');
        res.send('Vote counted!');
      });
    }
  },

  pollById: {
    post: (req, res, next) => {
      let pollLink = req.body.pollLink;
      
        sequelize.models.poll.find({
          where: {link: pollLink},
          include: [{all:true}]
        }).then(poll => {
          if (poll) {
            let returnObj = {};
            returnObj.pollTitle = poll.dataValues.title;
            returnObj.pollDesc = poll.dataValues.description;
            returnObj.pollId = poll.dataValues.id;
            returnObj.pollLink = poll.dataValues.link;
            returnObj.owner = poll.dataValues.user.dataValues.name;
            returnObj.choices = [];
      
            let choicesArray = poll.dataValues.choices;
            for (let i = 0; i < choicesArray.length; i++) {
              let choiceObject = choicesArray[i].dataValues;
              returnObj.choices.push({
                text: choiceObject.text,
                id: choiceObject.id
              });
            }
            
            res.json(returnObj);
          }
        });
    }
  }
}