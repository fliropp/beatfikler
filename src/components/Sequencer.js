import React, { Component } from 'react';
import SequencesView from './SequencesView.js';
import SequencesInput from './SequencesInput.js';
import Notification from './Notification.js';
import '../beatfikler.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions.js';
import click1 from '../audio/click1.wav';
import click2 from '../audio/click2.wav';


class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  resetState = () => {
    this.props.resetState();
  }

  playSequence = () => {
    this.timer = setInterval(
      this.playClick,
      (60 / this.props.state.bpm) * 1000
    );
  }

  playClick = () => {

      if (this.props.state.count === 1 && this.props.state.bar === this.props.state.sequence[this.props.state.sequenceIndex].bars) {

        if(this.props.state.sequence[this.props.state.sequenceIndex + 1] === undefined){
          clearInterval(this.timer);
          this.props.resetState();
          this.props.flipPlaying()
          return;
        }
        this.props.nextSequence();
        clearInterval(this.timer);
        this.playSequence();
      }

      if (this.props.state.count === 1) {
        this.click2.play();
      } else {
        this.click1.play();
      }
      this.props.nextBeat((this.props.state.count + 1) % this.props.state.beatsPerMeasure, this.props.state.count === 0 ? this.props.state.bar + 1 : this.props.state.bar)

  }

  startStopSequence = () => {
    if (this.props.state.playing) {
      clearInterval(this.timer);
      this.props.resetState();
    } else {
      if(this.props.state.sequence.length === 0) {
        this.props.state.notification('STATUS: NO SEQUENCES SET')
      } else {
        this.props.setBpm(this.props.state.sequence[0].bpm)
        this.props.initSequence();
        this.playSequence();
      }
    }
  };

  render() {
    return <div className="sequencer">
      <div className='seqHeader'>BEATFIKLER</div>
      <button onClick={this.startStopSequence}>{this.props.state.playing ? 'Stop' : 'Start'}</button>
      <SequencesView/>
      <SequencesInput/>
      <Notification/>
    </div>;
  }
}
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateSequenceIndex: () => { dispatch(actions.updateSequenceIndex()) },
  initSequence: () => { dispatch(actions.initSequence())},
  nextSequence: () => {dispatch(actions.nextSequence())},
  nextBeat: (count, bar) => {dispatch(actions.nextBeat(count, bar))},
  resetState: () => {dispatch(actions.resetState())},
  flipPlaying: () => {dispatch(actions.flipPlaying())},
  setBpm: (bpm) => {dispatch(actions.setBpm(bpm))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);

//export default Sequencer;
