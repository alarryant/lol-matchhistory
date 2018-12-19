import React, { Component } from 'react';
import Champions from './en_US/champion.json';
import Items from './en_US/item.json';
import Runes from './en_US/runesReforged.json';
import SummonerSpells from './en_US/summoner.json';

class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.displayMatch = this.displayMatch.bind(this);
    this.findChampionName = this.findChampionName.bind(this);
    this.findRuneName = this.findRuneName.bind(this);
    this.findSummonerSpellName = this.findSummonerSpellName.bind(this);
    this.findItemName = this.findItemName.bind(this);
    this.findChampionImg = this.findChampionImg.bind(this);
  }

  findChampionName(key) {
    let championName;
    let parsedChampions = JSON.parse(JSON.stringify(Champions)).data;
    Object.values(parsedChampions).forEach((champion) => {
      if (Number(champion.key) === key) {
        championName = champion.name;
      }
    });
    return championName;
  }

  findChampionImg(key) {
    let championImg;
    let parsedChampions = JSON.parse(JSON.stringify(Champions)).data;
    Object.values(parsedChampions).forEach((champion) => {
      if (Number(champion.key) === key) {
        championImg = champion.image.full;
      }
    });
    return championImg;
  }

  findRuneName(id) {
    let runeName;
    let parsedRunes = JSON.parse(JSON.stringify(Runes));
    parsedRunes.forEach((rune) => {
      rune.slots.forEach((slot) => {
        slot.runes.forEach((runeSlot) => {
          if (Number(runeSlot.id) === id) {
            runeName = runeSlot.icon;
          }
        });
      });
    });
    return runeName;
  }

  findSummonerSpellName(key) {
    let summonerSpellName;
    let parsedSummonerSpells = JSON.parse(JSON.stringify(SummonerSpells)).data;
    Object.values(parsedSummonerSpells).forEach((spell) => {
      if (Number(spell.key) === key) {
        summonerSpellName = spell.image.full;
      }
    });
    return summonerSpellName;
  }

  findItemName(key) {
    let itemName;
    let parsedItems = JSON.parse(JSON.stringify(Items)).data;
    Object.keys(parsedItems).forEach((item) => {
      if (Number(item) === key) {
        itemName = parsedItems[key].image.full;
      }
    });
    return itemName;
  }

  displayMatch(matches=[]) {
    return matches.map(match => {
      return (
          match.stats.win ? (
            <div className="matchBoxWin">
              <div className="contentWrapper">
              <img className="championImg" src={`/champion/${this.findChampionImg(match.champion)}`}/>
                <span className="champion">
                  <h2>{this.findChampionName(match.champion)}</h2>
                  <br/>
                  <h5>Level {match.stats.champLevel}</h5>
                  <h5>K/D/A:</h5>
                  <p>{match.stats.kills}/{match.stats.deaths}/{match.stats.assists}</p>
                  <br/>
                  <h5>CS:</h5>
                  <p>{match.stats.totalMinionsKilled}</p>
                  <h5>CS/min:</h5>
                  <p>{Math.floor((match.stats.totalMinionsKilled/match.gameDuration*60) * 100) / 100}</p>
                  <br/>
                  <h5>Summoners:</h5>
                  <img src={`/spell/${this.findSummonerSpellName(match.summSpellOne)}`}/>
                  <img src={`/spell/${this.findSummonerSpellName(match.summSpellTwo)}`}/>
                </span>
                <br/>
                <span className="duration">
                  <h5>Game Duration:</h5>
                  <p>{Math.floor(match.gameDuration/60)} minutes and {match.gameDuration % 60} seconds</p>
                </span>
                <br/>
                <span className="items">
                  <h5>Items:</h5>
                  {match.stats.item0 ? <img src={`/item/${this.findItemName(match.stats.item0)}`}/> : ''}
                  {match.stats.item1 ? <img src={`/item/${this.findItemName(match.stats.item1)}`}/> : ''}
                  {match.stats.item2 ? <img src={`/item/${this.findItemName(match.stats.item2)}`}/> : ''}
                  {match.stats.item3 ? <img src={`/item/${this.findItemName(match.stats.item3)}`}/> : ''}
                  {match.stats.item4 ? <img src={`/item/${this.findItemName(match.stats.item4)}`}/> : ''}
                  {match.stats.item5 ? <img src={`/item/${this.findItemName(match.stats.item5)}`}/> : ''}
                </span>
                <br/>
                <span className="runes">
                  <h5>Runes:</h5>
                  {match.stats.perk0 ? <img src={this.findRuneName(match.stats.perk0)}/> : ''}
                  {match.stats.perk1 ? <img src={this.findRuneName(match.stats.perk1)}/> : ''}
                  {match.stats.perk2 ? <img src={this.findRuneName(match.stats.perk2)}/> : ''}
                  {match.stats.perk3 ? <img src={this.findRuneName(match.stats.perk3)}/> : ''}
                  {match.stats.perk4 ? <img src={this.findRuneName(match.stats.perk4)}/> : ''}
                  {match.stats.perk5 ? <img src={this.findRuneName(match.stats.perk5)}/> : ''}
                </span>
              </div>
            </div>
            ) : (
            <div className="matchBoxLose">
              <div className="contentWrapper">
                <img className="championImg" src={`/champion/${this.findChampionImg(match.champion)}`}/>
                <span className="champion">
                  <h2>{this.findChampionName(match.champion)}</h2>
                  <br/>
                  <h5>Level:</h5>
                  <p>{match.stats.champLevel}</p>
                  <h5>K/D/A:</h5>
                  <p>{match.stats.kills}/{match.stats.deaths}/{match.stats.assists}</p>
                  <br/>
                  <h5>CS:</h5>
                  <p>{match.stats.totalMinionsKilled}</p>
                  <h5>CS/min:</h5>
                  <p>{Math.floor((match.stats.totalMinionsKilled/match.gameDuration*60) * 100) / 100}</p>
                  <br/>
                  <h5>Summoners:</h5>
                  <img src={`/spell/${this.findSummonerSpellName(match.summSpellOne)}`}/>
                  <img src={`/spell/${this.findSummonerSpellName(match.summSpellTwo)}`}/>
                </span>
                <br/>
                <span className="duration">
                  <h5>Game Duration:</h5>
                  <p>{Math.floor(match.gameDuration/60)} minutes and {match.gameDuration % 60} seconds</p>
                </span>
                <br/>
                <span className="items">
                  <h5>Items:</h5>
                  {match.stats.item0 ? <img src={`/item/${this.findItemName(match.stats.item0)}`}/> : ''}
                  {match.stats.item1 ? <img src={`/item/${this.findItemName(match.stats.item1)}`}/> : ''}
                  {match.stats.item2 ? <img src={`/item/${this.findItemName(match.stats.item2)}`}/> : ''}
                  {match.stats.item3 ? <img src={`/item/${this.findItemName(match.stats.item3)}`}/> : ''}
                  {match.stats.item4 ? <img src={`/item/${this.findItemName(match.stats.item4)}`}/> : ''}
                  {match.stats.item5 ? <img src={`/item/${this.findItemName(match.stats.item5)}`}/> : ''}
                </span>
                <br/>
                <span className="runes">
                  <h5>Runes:</h5>
                  {match.stats.perk0 ? <img src={this.findRuneName(match.stats.perk0)}/> : ''}
                  {match.stats.perk1 ? <img src={this.findRuneName(match.stats.perk1)}/> : ''}
                  {match.stats.perk2 ? <img src={this.findRuneName(match.stats.perk2)}/> : ''}
                  {match.stats.perk3 ? <img src={this.findRuneName(match.stats.perk3)}/> : ''}
                  {match.stats.perk4 ? <img src={this.findRuneName(match.stats.perk4)}/> : ''}
                  {match.stats.perk5 ? <img src={this.findRuneName(match.stats.perk5)}/> : ''}
                </span>
              </div>
            </div>
            )
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <h1>Loading...</h1>
          ) : (
          <div>
            {this.props.summoner.name ? <h1>Displaying Match History for</h1> : <h3>Please enter a summoner name.</h3>}
            <h3>{this.props.summoner.name}</h3>
          </div>
          )}
        {this.props.loading ? '' : this.displayMatch(this.props.matches)}
      </div>
    )
  }
}

export default MatchHistory;