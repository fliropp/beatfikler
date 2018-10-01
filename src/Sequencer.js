import React, { Component } from 'react';
import './beatfikler.css';
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';


class Sequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 1,
      bar: 0,
      bpm: 100,
      beatsPerMeasure: 4,
      sequence: [{bpm:100, bars:2},{bpm:180, bars:2},{bpm:100, bars:2},{bpm:180, bars:2}],
      sequenceIndex: 0
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  resetState = () => {
    this.setState({
      playing: false,
      count: 1,
      bar: 0,
      bpm: 100,
      beatsPerMeasure: 4,
      sequence: [{bpm:100, bars:2},{bpm:180, bars:2},{bpm:100, bars:2},{bpm:180, bars:2}],
      sequenceIndex: 0
    });
  }

  playSequence = () => {
    this.timer = setInterval(
      this.playClick,
      (60 / this.state.bpm) * 1000
    );
  }

  playClick = () => {

      if (this.state.count === 1 && this.state.bar === this.state.sequence[this.state.sequenceIndex].bars) {

        if(this.state.sequence[this.state.sequenceIndex + 1] === undefined){
          clearInterval(this.timer);
          this.resetState();
          this.setState({playing: false});
          return;
        }

        this.setState(state => ({
          sequenceIndex: this.state.sequenceIndex + 1,
          bar: 0,
          bpm: this.state.sequence[this.state.sequenceIndex + 1].bpm,
        }));
        clearInterval(this.timer);
        this.playSequence();
      }

      if (this.state.count === 1) {
        this.click2.play();
      } else {
        this.click1.play();
      }

      this.setState(state => ({
        count: (state.count + 1) % state.beatsPerMeasure,
        bar: state.count === 0 ? state.bar + 1 : state.bar
      }));

  }

  startStopSequence = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.resetState();
    } else {
      // Start a timer with the current BPM
      this.setState(
        {
          count: 1,
          playing: true,
          bpm: this.state.sequence[this.state.sequenceIndex].bpm,
        },
      );
      this.playSequence();
    }
  };

  render() {
    return <div className="sequencer">
      <div className='seqHeader'>BEATFIKLER HEADER</div>
      <button onClick={this.startStopSequence}>{this.state.playing ? 'Stop' : 'Start'}</button>
    </div>;
  }
}
export default Sequencer;
