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

    const getItemListId = (itemListCopy) => {
      const list = itemListCopy.map(x => x.id);
      for (let i = 0; i < itemListCopy.length; i++) {
        if(!list.includes(`item-${i}`)){
          return `item-${i}`;
        }
      }
      return `item-${itemListCopy.length}`;
    }

    const storeSeqEntry = (e) => {
          e.preventDefault();
          if (Number.isInteger(parseInt(this.state.newBpm)) && Number.isInteger(parseInt(this.state.newBars))){
            this.props.updateSequence(this.state.newBpm, this.state.newBars);
            this.props.updateListItems(this.state.newBpm, this.state.newBars, getItemListId(this.props.state.listItems));
            this.props.setNotification('');
          } else {
            this.props.setNotification('STATUS: INPUT NOT VALID');
          }
    }

    return <form>
      <input type="text" className="newBpm" name="newBpm" placeholder="BPM" onChange={event => tpmStoreSeqValue(event)}/>
      <input type="text" className="newBars" name="newBars" placeholder="BARS" onChange={event => tpmStoreSeqValue(event)}/>
      <button className="addSeqButton" onClick={e => storeSeqEntry(e)}>Add new entry</button>
    </form>;
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateSequence: (bpm, bars) => { dispatch(actions.updateSequence(bpm , bars)) },
  updateListItems: (bpm, bars, itemId) => {dispatch(actions.updateListItems(bpm, bars, itemId))},
  setNotification: (note) => {dispatch(actions.setNotification(note))},
});

export default connect(mapStateToProps, mapDispatchToProps)(SequencesInput);
