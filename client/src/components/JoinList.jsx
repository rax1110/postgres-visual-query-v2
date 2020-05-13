import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { addJoin, updateJoinsOrder } from '../actions/queryActions';
import Join from './Join';
import { translations } from '../utils/translations';

export const JoinList = (props) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const movedJoins = props.joins.find(join => draggableId.localeCompare(`join-${join.id}`) === 0);
    const newJoins = Array.from(props.joins);

    newJoins.splice(source.index, 1);
    newJoins.splice(destination.index, 0, movedJoins);

    props.updateJoins(newJoins);
  };

  const handleAddJoin = () => {
    props.addJoin();
  };

  return (
    <div>
      <div className="text-info">
        <Button
          className="mb-1"
          outline
          color="info"
          size="sm"
          onClick={handleAddJoin}
          disabled={_.isEmpty(props.tables)}
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
        {' '}
        {translations[props.language.code].queryBuilder.addJoin}
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
              {props.joins.map((join, index) => (
                <Join
                  key={`join-${join.id}-query-${props.queryId}`}
                  id={`join-${join.id}-query-${props.queryId}`}
                  join={join}
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

JoinList.propTypes = {
  joins: PropTypes.arrayOf(PropTypes.shape({})),
  addJoin: PropTypes.func,
  updateJoins: PropTypes.func,
  language: PropTypes.shape({ code: PropTypes.string }),
  tables: PropTypes.arrayOf(PropTypes.shape({
    table_alias: PropTypes.string,
    table_name: PropTypes.string,
    table_schema: PropTypes.string,
  })),
  queryId: PropTypes.number,
};

const mapStateToProps = store => ({
  joins: store.query.joins,
  tables: store.query.tables,
  language: store.settings.language,
  queryId: store.query.id,
});

const mapDispatchToProps = {
  updateJoins: data => updateJoinsOrder(data),
  addJoin,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinList);
