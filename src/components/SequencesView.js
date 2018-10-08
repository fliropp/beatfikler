import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions.js';
import '../beatfikler.css';

const grid = 8;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItems = sequence =>
  Array.from({ length: sequence.length }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    bpm: sequence[k].bpm,
    bars: sequence[k].bars
  }));

class SequencesView extends Component {
  constructor(props) {
    super(props);
    this.props.setListItems(getItems(this.props.state.sequence));
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if(result.destination.droppableId === 'trashbin'){
      this.props.removeSequenceEntry(result.source.index);
      this.props.removeListItemEntry(result.draggableId);
    } else {

      const items = reorder(
        this.props.state.listItems,
        result.source.index,
        result.destination.index
      );
      this.props.setListItems(items);
      const newSec = items.map(i => { return {
        bpm: i.bpm,
        bars: i.bars
      }});
      this.props.reorderSequence(newSec);
      this.props.setBpm(this.props.state.sequence[0].bpm);
    }
  }


render() {



    return <DragDropContext onDragEnd={this.onDragEnd}>
       <Droppable droppableId="droppable">
         {(provided, snapshot) => (
           <div
             ref={provided.innerRef}
             style={getListStyle(snapshot.isDraggingOver)}
           >
           {this.props.state.listItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className="sequenceData">
                      <div className="bpm">bpm: {item.bpm}</div>
                      <div className="bars">bars: {item.bars}</div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="trashbin">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            <img src="../graph/trash_1-512.png" height="100"/>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
    </DragDropContext>

  }
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateSequence: (bpm, bars) => { dispatch(actions.updateSequence(bpm , bars)) },
  reorderSequence: (sequence) => { dispatch(actions.reorderSequence(sequence))},
  setListItems: (list) => { dispatch(actions.setListItems(list))},
  setBpm: (bpm) => { dispatch(actions.setBpm(bpm))},
  removeSequenceEntry: (index) => {dispatch(actions.removeSequenceEntry(index))},
  removeListItemEntry: (id) => {dispatch(actions.removeListItemEntry(id))}
});

export default connect(mapStateToProps, mapDispatchToProps)(SequencesView);
