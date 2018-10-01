import * as actions from '../actions/actions.js';
import {createStore} from 'redux';

const getInitState = () => {
  return {
    playing: false,
    count: 1,
    bar: 0,
    bpm: 100,
    beatsPerMeasure: 4,
    sequence: [{bpm:100, bars:2},{bpm:180, bars:2},{bpm:100, bars:2},{bpm:180, bars:2}],
    sequenceIndex: 0
  }
}

const sequencerStore = (state = getInitState(), action) => {
  switch (action.type) {
    case actions.UPDATE_SEQUENCE_INDEX:
      return {...state, sequenceIndex: 123 };
    case actions.INIT_SEQUENCE:
      return {...state, count: 1, playing:true, bpm:state.sequence[state.sequenceIndex].bpm};
    case actions.NEXT_SEQUENCE:
      return {...state,
          sequenceIndex: state.sequenceIndex + 1,
          bar: 0,
          bpm: state.sequence[state.sequenceIndex + 1].bpm
          }
    case actions.RESET_STATE:
      return {...state,
          playing: false,
          count: 1,
          bar: 0,
          bpm: 100,
          beatsPerMeasure: 4,
          sequence: [{bpm:100, bars:2},{bpm:180, bars:2},{bpm:100, bars:2},{bpm:180, bars:2}],
          sequenceIndex: 0
        };
    case actions.NEXT_BEAT:
      return {...state, count:action.count, bar: action.bar};
    default:
      return state
  }
}

let store = createStore(sequencerStore);
export default store;
