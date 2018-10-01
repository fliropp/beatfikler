export const UPDATE_SEQUENCE_INDEX = 'UPDATE_SEQUENCE_INDEX';
export const RESET_STATE = 'RESET_STATE';
export const FLIP_PLAYING = 'FLIP_PLAYING';
export const INIT_SEQUENCE = 'INIT_SEQUENCE';
export const NEXT_SEQUENCE = 'NEXT_SEQUENCE';
export const NEXT_BEAT = 'NEXT_BEAT';

export const updateSequenceIndex  = () => {
  return { type: UPDATE_SEQUENCE_INDEX };
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
