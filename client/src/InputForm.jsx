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
    this.props.isLoading(true);
    axios.post('/api/summonername', {summonerName: this.state.summonerName})
      .then((res) => {
        this.setState({summonerName: ''});
        this.props.isLoading(false);
        this.props.getMatchHistory(res.data.summoner, res.data.matches);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Summoner:
        </label>
        <input className="nameInput" type="text" name="summonername" onChange={this.handleChange} placeholder="Summoner Name"/>
        <input className="submitInput" type="submit" value="Submit" />
      </form>
    )
  }
}

export default InputForm;