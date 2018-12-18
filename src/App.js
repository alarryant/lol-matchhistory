import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './InputForm.jsx';
import MatchHistory from './MatchHistory.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {matches: [], summoner: {}};
    this.getMatchHistory = this.getMatchHistory.bind(this);
  }

  getMatchHistory = (summoner, matches) => {
    this.setState({summoner: summoner, matches: matches});
  }

  render() {
    return (
      <div>
        <InputForm getMatchHistory={this.getMatchHistory} />
        <MatchHistory matches={this.state.matches} summoner={this.state.summoner} />
      </div>
    );
  }
}

export default App;
