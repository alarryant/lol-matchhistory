import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './InputForm.jsx';
import MatchHistory from './MatchHistory.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.getMatchHistory = this.getMatchHistory.bind(this);
  }

  getMatchHistory = (summoner, match) => {
    console.log("this is in app", summoner, match);
    this.setState({summoner: summoner, match: match});
  }

  // componentDidMount() {
  //   fetch('/api/summonername')
  //     .then(res => console.log(res));
  // }

  render() {
    return (
      <div>
        <InputForm getMatchHistory={this.getMatchHistory}/>
        <MatchHistory />
      </div>
    );
  }
}

export default App;
