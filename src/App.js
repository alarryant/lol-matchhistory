import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './InputForm.jsx';
import MatchHistory from './MatchHistory.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <InputForm />
        <MatchHistory />
      </div>
    );
  }
}

export default App;
