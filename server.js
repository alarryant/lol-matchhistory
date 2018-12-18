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

app.post('/api/summonername', (req, res) => {
  const summonerName = req.body.summonerName;
  leagueJs.Summoner
    .gettingByName(summonerName)
    .then(summoner => {
        'use strict';
        leagueJs.Match
          .gettingListByAccount(summoner.accountId, 'na1')
          .then(matches => {
            'use strict';
            let matchDetailArray = [];
            let matchArray = matches.matches.slice(0, 10);
            let participantStats = [];
            matchArray.forEach(function(match, index) {
              leagueJs.Match
                .gettingById(match.gameId, 'na1')
                .then(matchDetails => {
                  'use strict';
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
                  'use strict';
                  console.log(err);
                });
              });
          })
          .catch(err => {
            'use strict';
            console.log(err);
          });
    })
    .catch(err => {
        'use strict';
        console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});