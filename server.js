require('dotenv').config();
const env = process.env.ENV || 'development';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const LeagueJs = require('LeagueJS');
const leagueJs = new LeagueJs(process.env.LEAGUE_API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// var summonerName = '';

app.post('/summonername', (req, res) => {
  const summonerName = req.body.summonerName;
  leagueJs.Summoner
    .gettingByName(summonerName)
    .then(summoner => {
        'use strict';
        leagueJs.Match
          .gettingListByAccount(summoner.accountId, 'na1')
          .then(match => {
            'use strict';
            res.send({summoner: summoner, match: match});
            // console.log(data);
          })
          .catch(err => {
            'use strict';
            console.log(err);
          });
        // console.log(data);
        // res.send(data);
    })
    .catch(err => {
        'use strict';
        console.log(err);
    });
  // console.log("this is summ name", summonerName);
});

// app.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}`, (req, res) => {

// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});