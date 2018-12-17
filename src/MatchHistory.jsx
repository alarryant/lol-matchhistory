import React, { Component } from 'react';
import axios from 'axios';

class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.displayMatch = this.displayMatch.bind(this);
  }

  displayMatch(matches=[]) {
    return matches.map(match => {
      return <h5>Champion Played: {match.champion}</h5>
    })
  }

  render() {
    return (
      <div>
        <h1>Showing Match History for {this.props.summoner.name}</h1>
        {this.displayMatch(this.props.matches.matches)}
      </div>
    )
  }
}

export default MatchHistory;