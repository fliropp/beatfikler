import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions.js';
import '../beatfikler.css';

class SequencesInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ul className='sequences'>
      {this.props.state.sequence.map(s =>{
        return (<li>bar: {s.bars} bpm: {s.bpm}</li>)
      })}
      </ul>;
  }
}
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateSequences: () => { dispatch(actions.updateSequenceIndex()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SequencesInput);
