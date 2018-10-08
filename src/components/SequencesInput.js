import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions.js';

class SequencesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBpm:'',
      newBars:'',
    };
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
          if (Number.isInteger(parseInt(this.state.newBpm)) && Number.isInteger(parseInt(this.state.newBars))){
            this.props.updateSequence(this.state.newBpm, this.state.newBars);
            this.props.updateListItems(this.state.newBpm, this.state.newBars);
            this.props.setNotification('');
          } else {
            this.props.setNotification('STATUS: INPUT NOT VALID');
          }
    }

    return <form>
      <input type="text" className="newBpm" name="newBpm"  onChange={event => tpmStoreSeqValue(event)}/>
      <input type="text" className="newBars" name="newBars"  onChange={event => tpmStoreSeqValue(event)}/>
      <button className="addSeqButton" onClick={e => storeSeqEntry(e)}>Add</button>
    </form>;
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateSequence: (bpm, bars) => { dispatch(actions.updateSequence(bpm , bars)) },
  updateListItems: (bpm, bars) => {dispatch(actions.updateListItems(bpm, bars))},
  setNotification: (note) => {dispatch(actions.setNotification(note))},
});

export default connect(mapStateToProps, mapDispatchToProps)(SequencesInput);
