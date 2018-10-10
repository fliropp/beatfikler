import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions.js';

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="notification">
     <div className="status">{this.props.state.notification}</div>
     <div className="bpm">CURRENT BPM: {this.props.state.bpm}</div>
     </div>;
  }
}

const mapStateToProps = (state) => ({
  state: state
});

export default connect(mapStateToProps)(Notification);
