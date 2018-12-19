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
    this.isLoading = this.isLoading.bind(this);
  }

  getMatchHistory = (summoner, matches) => {
    this.setState({summoner: summoner, matches: matches});
  }

  isLoading = (boolean) => {
    this.setState({loading: boolean});
  };

  render() {
    return (
      <div>
        <h1 className="title">
          LoL Match History
        </h1>
        <InputForm getMatchHistory={this.getMatchHistory} isLoading={this.isLoading}/>
        <MatchHistory matches={this.state.matches} summoner={this.state.summoner} loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;
