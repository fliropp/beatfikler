import * as actions from '../actions/actions.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const getInitState = () => {
  return {
    playing: false,
    count: 1,
    bar: 0,
    bpm: 100,
    beatsPerMeasure: 4,
    sequence: [{bpm:100, bars:2},{bpm:180, bars:2},{bpm:100, bars:2},{bpm:180, bars:2}],
    sequenceIndex: 0,
    notification:'',
    listItems: []
  }
}

const sequencerStore = (state = getInitState(), action) => {
  switch (action.type) {
    case actions.SET_BPM:
      return {...state, bpm: parseInt(action.bpm)};
    case actions.FLIP_PLAYING:
      return {...state, playing: !state.playing}
    case actions.UPDATE_SEQUENCE_INDEX:
      return {...state, sequenceIndex: state.sequenceIndex + 1 };
    case actions.UPDATE_SEQUENCE:
      return {...state, sequence:[...state.sequence, {bpm: parseInt(action.bpm), bars: parseInt(action.bars)}]};
    case actions.REORDER_SEQUENCE:
      return {...state, sequence: action.sequence};
    case actions.REMOVE_SEQUENCE_ENTRY:
      return {...state, sequence: [...state.sequence.slice(0, action.index),
                                   ...state.sequence.slice(action.index + 1) ]};
    case actions.INIT_SEQUENCE:
      return {...state, count: 1, playing:true, bpm: state.sequence[state.sequenceIndex].bpm};
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
          bpm: state.sequence[state.sequenceIndex] !== undefined ? state.sequence[state.sequenceIndex].bpm : 100,
          beatsPerMeasure: 4,
          sequenceIndex: 0
        };
    case actions.NEXT_BEAT:
      return {...state, count:action.count, bar: action.bar};
    case actions.SET_NOTIFICATION:
      return {...state, notification: action.note};
    case actions.SET_LIST_ITEMS:
      return {...state, listItems: action.list};
    case actions.REMOVE_LIST_ITEM_ENTRY:
      return {...state, listItems: state.listItems.filter((item) => item.id !== action.id)};
    case actions.UPDATE_LIST_ITEMS:
      return {...state,
        listItems:[...state.listItems, {
          id: action.item,
          bpm: parseInt(action.bpm),
          bars: parseInt(action.bars)
        }]};
    default:
      return state
  }
}

let store = createStore(sequencerStore, applyMiddleware(thunk));
export default store;
