import React, { Component } from 'react';
import axios from 'axios';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {region: "na1"};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({summonerName: event.target.value});
  }

  handleSelectChange = (event) => {
    event.preventDefault();
    this.setState({region: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.isLoading(true);
    axios.post('/api/summonername', {summonerName: this.state.summonerName, region: this.state.region})
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
        <select value={this.state.region} onChange={this.handleSelectChange}>
          <option value="na1">NA</option>
          <option value="euw1">EUW</option>
          <option value="eun1">EUNE</option>
          <option value="kr">KR</option>
          <option value="jp1">JP</option>
          <option value="kr">KR</option>
        </select>
        <input className="submitInput" type="submit" value="Submit" />
      </form>
    )
  }
}

export default InputForm;