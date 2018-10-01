import React, { Component } from 'react';
import Sequencer from './Sequencer.js';
import './beatfikler.css';
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';


class Beatfikler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bar: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({ bpm });
  }

  playClick = () => {
    const { count, bar, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure,
      bar: (state.count % state.beatsPerMeasure) === 0 ? bar + 1 : bar
    }));
  };

  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };

  render() {
    const { playing, bpm } = this.state;
    return <div className="beatfikler">
    <div className="bpm-slider">
      <div>{bpm} BPM</div>
        <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
      </div>
      <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      <Sequencer/>
    </div>;
  }
}

export default Beatfikler;
