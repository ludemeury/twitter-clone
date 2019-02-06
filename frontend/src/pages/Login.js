import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class pages extends Component {
  state = {
    username: '',
  };

  handleInputChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {username} = this.state;

    if(!username.length) return;

    localStorage.setItem("@twitterClone:username", username);

    this.props.history.push("/timeline");
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Twitter Clone"></img>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Username" />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}
