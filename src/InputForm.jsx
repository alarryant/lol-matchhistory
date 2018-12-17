import React, { Component } from 'react';

class InputForm extends Component {
  render() {
    return (
      <form>
        <label>
          Summoner Name:
          <input type="text" name="summonername" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default InputForm;