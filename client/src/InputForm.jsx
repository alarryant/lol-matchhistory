import React, { Component } from 'react';
import axios from 'axios';

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({summonerName: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/summonername', {summonerName: this.state.summonerName})
      .then((res) => {
        this.props.getMatchHistory(res.data.summoner, res.data.matches);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Summoner Name:
          <input type="text" name="summonername" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default InputForm;