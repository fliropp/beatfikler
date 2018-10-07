import React, { Component } from 'react';
import Sequencer from './components/Sequencer.js';
import './beatfikler.css';
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';
import { Provider } from 'react-redux';
import store from './store/store.js';


class Beatfikler extends Component {
  constructor(props) {
    super(props);
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  render() {
    return <Provider store={store}>
      <div className="beatfikler">
        <Sequencer state={this.props}/>
      </div>
   </Provider>;
  }
}

export default Beatfikler;
