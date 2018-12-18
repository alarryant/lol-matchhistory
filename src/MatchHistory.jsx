import React, { Component } from 'react';
// import axios from 'axios';

class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.displayMatch = this.displayMatch.bind(this);
  }

  displayMatch(matches=[]) {
    return matches.map(match => {
      return (
        <div>
        <h5>Champion Played: {match.champion} Level:{match.stats.champLevel}</h5>
        <h5>Summoner Spells: {match.summSpellOne} & {match.summSpellTwo}</h5>
        <h5>Items bought: {match.stats.item0}, {match.stats.item1}, {match.stats.item2}, {match.stats.item3}, {match.stats.item4}, {match.stats.item5}, {match.stats.item6}</h5>
        <h5>CS: {match.stats.totalMinionsKilled}</h5>
        <h5>CS/min: {match.stats.totalMinionsKilled/match.gameDuration*60}</h5>
        <h5>K/DA: {(match.stats.kills+match.stats.assists)/match.stats.deaths}</h5>
        <h5>Runes: {match.stats.perk0}, {match.stats.perk1}, {match.stats.perk2}, {match.stats.perk3}, {match.stats.perk4}, {match.stats.perk5}</h5>
        </div>
        )
    })
  }

  render() {
    return (
      <div>
        {this.props.summoner.name ? (<h1>Displaying Match History for {this.props.summoner.name}</h1>) : <h1>Loading...</h1>}
        {this.displayMatch(this.props.matches)}
      </div>
    )
  }
}

export default MatchHistory;