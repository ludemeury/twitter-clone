import React, { Component } from 'react';
import './Timeline.css';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

export default class pages extends Component {
  state = {
    tweets: [],
    newTweet: '',
  };

  async componentDidMount() {
    const response = await api.get('tweets');
    this.setState({ tweets: response.data });
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    const io = socket("http://localhost:3000");
    io.on('tweet', data => {
      this.setState({tweets: [data, ...this.state.tweets]});
    });

    io.on('like', data => {
      this.setState({tweets: this.state.tweets.map(tweet => 
        tweet._id === data._id ? data : tweet
      )});
    });
  }

  handleInputChange = e => {
    this.setState({
      newTweet: e.target.value
    });
  };

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;
    const content = this.state.newTweet;
    const author = localStorage.getItem("@twitterClone:username");

    await api.post("tweets", { content, author });
    this.setState({
      newTweet: '',
    });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="Twitter Clone"></img>
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="What's happening?" />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet tweet={tweet} key={tweet._id} />
          ))}
        </ul>
      </div>
    );
  }
}
