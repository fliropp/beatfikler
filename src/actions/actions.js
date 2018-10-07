export const UPDATE_SEQUENCE_INDEX = 'UPDATE_SEQUENCE_INDEX';
export const UPDATE_SEQUENCE = 'UPDATE_SEQUENCE';
export const REORDER_SEQUENCE = 'REORDER_SEQUENCE';
export const RESET_STATE = 'RESET_STATE';
export const FLIP_PLAYING = 'FLIP_PLAYING';
export const INIT_SEQUENCE = 'INIT_SEQUENCE';
export const NEXT_SEQUENCE = 'NEXT_SEQUENCE';
export const NEXT_BEAT = 'NEXT_BEAT';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_LIST_ITEMS = 'SET_LIST_ITEMS';
export const UPDATE_LIST_ITEMS = 'UPDATE_LIST_ITEMS';
export const SET_BPM = 'SET_BPM';

export const setBpm = (bpm) => {
  return {type: SET_BPM, bpm}
}
export const updateSequenceIndex  = () => {
  return { type: UPDATE_SEQUENCE_INDEX };
}

export const updateSequence = (bpm, bars) => {
  return { type: UPDATE_SEQUENCE, bpm, bars }
}

export const reorderSequence = (sequence) => {
  return {type: REORDER_SEQUENCE, sequence}
}

export const resetState  = () => {
  return { type: RESET_STATE };
}

export const flipPlaying = () => {
  return { type: FLIP_PLAYING };
}

export const initSequence = () => {
  return {type: INIT_SEQUENCE };
}

export const nextSequence = () => {
  return {type: NEXT_SEQUENCE};
}

export const nextBeat = (count, bar) => {
  return {type: NEXT_BEAT, count, bar};
}

export const setNotification = (note) => {
  return {type: SET_NOTIFICATION, note};
}

export const setListItems = (list) => {
  return { type: SET_LIST_ITEMS, list}
}

export const updateListItems = (bpm, bars) => {
  return {type: UPDATE_LIST_ITEMS, bpm, bars}
}
