import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { addSet, updateSetsOrder } from '../actions/queryActions';
import { translations } from '../utils/translations';
import Set from './Set';

export const SetList = (props) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const movedSets = props.sets.find(set => draggableId.localeCompare(`set-${set.id}`) === 0);
    const newSets = Array.from(props.sets);

    newSets.splice(source.index, 1);
    newSets.splice(destination.index, 0, movedSets);

    props.updateSets(newSets);
  };

  const handleAddSet = () => {
    props.addSet();
  };

  return (
    <div>
      <div className="text-info">
        <Button
          className="mb-1"
          outline
          color="info"
          size="sm"
          onClick={handleAddSet}
          disabled={_.isEmpty(props.tables)}
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
        {' '}
        {translations[props.language.code].queryBuilder.addSet}
      </div>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="droppable-columns">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.sets.map((set, index) => (
                <Set
                  key={`set-${set.id}-queryId-${props.queryId}`}
                  id={`set-${set.id}`}
                  set={set}
                  index={index}
                  queryId={props.queryId}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

SetList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.shape({})),
  addSet: PropTypes.func,
  updateSets: PropTypes.func,
  language: PropTypes.shape({ code: PropTypes.string }),
  tables: PropTypes.arrayOf(PropTypes.shape({
    table_alias: PropTypes.string,
    table_name: PropTypes.string,
    table_schema: PropTypes.string,
  })),
  queryId: PropTypes.number,
};

const mapStateToProps = store => ({
  sets: store.query.sets,
  tables: store.query.tables,
  language: store.settings.language,
  queryId: store.query.id,
});

const mapDispatchToProps = {
  updateSets: data => updateSetsOrder(data),
  addSet,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetList);
