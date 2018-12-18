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

  findRuneName(id) {
    let runeName;
    let parsedRunes = JSON.parse(JSON.stringify(Runes));
    parsedRunes.forEach((rune) => {
      rune.slots.forEach((slot) => {
        slot.runes.forEach((runeSlot) => {
          if (Number(runeSlot.id) === id) {
            runeName = runeSlot.name;
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
        summonerSpellName = spell.name;
      }
    });
    return summonerSpellName;
  }

  findItemName(key) {
    let itemName;
    let parsedItems = JSON.parse(JSON.stringify(Items)).data;
    Object.keys(parsedItems).forEach((item) => {
      if (Number(item) === key) {
        itemName = parsedItems[key].name;
      }
    });
    return itemName;
  }

  displayMatch(matches=[]) {
    return matches.map(match => {
      return (
          match.stats.win ? (
            <div className="matchBoxWin">
              <h5>Game Duration: {Math.floor(match.gameDuration/60)} minutes and {match.gameDuration % 60} seconds</h5>
              <h5>Champion Played: {this.findChampionName(match.champion)} Level:{match.stats.champLevel}</h5>
              <h5>Summoner Spells: {this.findSummonerSpellName(match.summSpellOne)} & {this.findSummonerSpellName(match.summSpellTwo)}</h5>
              <h5>Items bought: {this.findItemName(match.stats.item0)}, {this.findItemName(match.stats.item1)}, {this.findItemName(match.stats.item2)}, {this.findItemName(match.stats.item3)}, {this.findItemName(match.stats.item4)}, {this.findItemName(match.stats.item5)}</h5>
              <h5>CS: {match.stats.totalMinionsKilled}</h5>
              <h5>CS/min: {Math.floor((match.stats.totalMinionsKilled/match.gameDuration*60) * 100) / 100}</h5>
              <h5>K/DA: {Math.floor(((match.stats.kills+match.stats.assists)/match.stats.deaths) * 100) / 100}</h5>
              <h5>Runes: {this.findRuneName(match.stats.perk0)}, {this.findRuneName(match.stats.perk1)}, {this.findRuneName(match.stats.perk2)}, {this.findRuneName(match.stats.perk3)}, {this.findRuneName(match.stats.perk4)}, {this.findRuneName(match.stats.perk5)}</h5>
            </div>
            ) : (
            <div className="matchBoxLose">
              <h5>Game Duration: {Math.floor(match.gameDuration/60)} minutes and {match.gameDuration % 60} seconds</h5>
              <h5>Champion Played: {this.findChampionName(match.champion)} Level:{match.stats.champLevel}</h5>
              <h5>Summoner Spells: {this.findSummonerSpellName(match.summSpellOne)} & {this.findSummonerSpellName(match.summSpellTwo)}</h5>
              <h5>Items bought: {this.findItemName(match.stats.item0)}, {this.findItemName(match.stats.item1)}, {this.findItemName(match.stats.item2)}, {this.findItemName(match.stats.item3)}, {this.findItemName(match.stats.item4)}, {this.findItemName(match.stats.item5)}</h5>
              <h5>CS: {match.stats.totalMinionsKilled}</h5>
              <h5>CS/min: {Math.floor((match.stats.totalMinionsKilled/match.gameDuration*60) * 100) / 100}</h5>
              <h5>K/DA: {Math.floor(((match.stats.kills+match.stats.assists)/match.stats.deaths) * 100) / 100}</h5>
              <h5>Runes: {this.findRuneName(match.stats.perk0)}, {this.findRuneName(match.stats.perk1)}, {this.findRuneName(match.stats.perk2)}, {this.findRuneName(match.stats.perk3)}, {this.findRuneName(match.stats.perk4)}, {this.findRuneName(match.stats.perk5)}</h5>
            </div>
            )
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.summoner.name ? (
          <h1>Displaying Match History for {this.props.summoner.name}</h1>
          ) : (
          <h1>Loading...</h1>
        )}
        {this.displayMatch(this.props.matches)}
      </div>
    )
  }
}

export default MatchHistory;