'use strict';

require('dotenv').config();
const env = process.env.ENV || 'development';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const LeagueJs = require('leaguejs');
const leagueJs = new LeagueJs(process.env.LEAGUE_API_KEY);
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.post('/api/summonername', (req, res) => {
  const summonerName = req.body.summonerName;
  const region = req.body.region;
  leagueJs.Summoner
    .gettingByName(summonerName, region)
    .then(summoner => {
      leagueJs.Match
        .gettingListByAccount(summoner.accountId, region)
        .then(matches => {
          let matchDetailArray = [];
          let matchArray = matches.matches.slice(0, 20);
          let participantStats = [];
          matchArray.forEach(function(match, index) {
            leagueJs.Match
              .gettingById(match.gameId, region)
              .then(matchDetails => {
                  matchDetails.participants.forEach((participant) => {
                    let participantId = null;
                    matchDetails.participantIdentities.forEach((participantIdentity) => {
                      if (participantIdentity.player.accountId === summoner.accountId) {
                        participantId = participantIdentity.participantId;
                      }
                    });
                    if (participant.participantId === participantId) {
                      participantStats.push({gameDuration: matchDetails.gameDuration,
                                            champion: participant.championId,
                                            summSpellOne: participant.spell1Id,
                                            summSpellTwo: participant.spell2Id,
                                            stats: participant.stats});
                    }
                  });
                  if (index === matchArray.length - 1) {
                    res.send({summoner: summoner, matches: participantStats});
                  }
                })
              .catch(err => {
                console.log(err);
              });
            });
          })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});