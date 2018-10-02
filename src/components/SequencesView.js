import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions.js';
import '../beatfikler.css';

class SequencesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBpm:'',
      newBars:''
    }
  }

  render() {

    const tpmStoreSeqValue = (e) => {
      e.preventDefault();
      const key = e.target.name;
      const value = e.target.value;
      this.setState( state => ({[key]: value }));
    }

    const storeSeqEntry = (e) => {
          e.preventDefault();
          this.props.updateSequences(this.state.newBpm, this.state.newBars);
    }

    return <div className='sequences'>
      {this.props.state.sequence.map(s =>{
        return (<div className='sequenceEntry'>bar: {s.bars} bpm: {s.bpm}</div>)
      })}
      <form>
        <input type="text" name="newBpm"  onChange={event => tpmStoreSeqValue(event)}/>
        <input type="text" name="newBars"  onChange={event => tpmStoreSeqValue(event)}/>
        <button onClick={e => storeSeqEntry(e)}>Save</button>
      </form>
      </div>;
  }
}
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateSequences: (bpm, bars) => { dispatch(actions.updateSequences(bpm , bars)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SequencesView);
