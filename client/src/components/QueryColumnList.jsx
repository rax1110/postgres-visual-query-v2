import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { CustomInput, FormGroup, Input, InputGroup, UncontrolledTooltip } from 'reactstrap';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import {
  setLimitValue,
  switchDistinct,
  switchLimit,
  updateColumnsOrder,
} from '../actions/queryActions';
import QueryColumn from './QueryColumn';
import FilterOperandSelectbox from './FilterOperandSelectbox';
import { translations } from '../utils/translations';

export const QueryColumnList = ({
  updateColumns, switchDistinctProp, columns, distinct,
  limit, switchLimitProp, limitValue, setLimitValueProp, language, queryId,
}) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const movedColumn = columns
      .find(column => _.isEqual(draggableId, `query-column-${column.id}`));
    const newColumns = Array.from(columns);

    newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, movedColumn);

    updateColumns(newColumns);
  };

  const showFilterOperandSelectbox = (column, queryColumns, index) => column.column_filter.length
    && index !== queryColumns.length - 1
    && queryColumns[index + 1].column_filter.length
    && queryColumns[index + 1].filter_as_having === queryColumns[index].filter_as_having;

  return (
    <div className="mt-2">
      <FormGroup className="d-flex m-auto align-items-center">
        <CustomInput
          type="switch"
          id="distinct"
          label={translations[language.code].queryBuilder.distinctL}
          checked={distinct}
          onChange={switchDistinctProp}
        />
        <CustomInput
          className="ml-2 mr-2"
          type="switch"
          id="limit_switch"
          label={translations[language.code].queryBuilder.limitL}
          checked={limit}
          onChange={switchLimitProp}
        />
        {limit && (
          <InputGroup className="w-auto" size="sm">
            <Input
              id="limit"
              placeholder="Value"
              value={limitValue || ''}
              min={0}
              max={999}
              type="number"
              step="1"
              onChange={e => setLimitValueProp(e.target.value)}
            />
            <UncontrolledTooltip
              placement="top"
              delay={{ show: 500, hide: 0 }}
              target="limit"
            >
              {translations[language.code].tooltips.limitValue}
            </UncontrolledTooltip>
          </InputGroup>
        )}
      </FormGroup>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-columns">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {columns.map((column, index) => (
                <React.Fragment key={column.id}>
                  <QueryColumn
                    key={`query-column-${column.id}-queryId-${queryId}`}
                    id={`query-column-${column.id}`}
                    index={index}
                    data={column}
                  />
                  {showFilterOperandSelectbox(column, columns, index)
                    ? (<FilterOperandSelectbox column={column} />)
                    : null
                  }
                </React.Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

QueryColumnList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({ column_filter: PropTypes.string })),
  updateColumns: PropTypes.func,
  distinct: PropTypes.bool,
  switchDistinctProp: PropTypes.func,
  limit: PropTypes.bool,
  switchLimitProp: PropTypes.func,
  limitValue: PropTypes.string,
  setLimitValueProp: PropTypes.func,
  language: PropTypes.shape({ code: PropTypes.string }),
  queryId: PropTypes.number,
};

const mapStateToProps = (store) => {
  const columns = _.orderBy(store.query.columns, ['filter_as_having'], ['asc']);

  return ({
    columns,
    distinct: store.query.distinct,
    limit: store.query.limit,
    limitValue: store.query.limitValue.toString(),
    language: store.settings.language,
    queryId: store.query.id,
  });
};


const mapDispatchToProps = {
  updateColumns: data => updateColumnsOrder(data),
  switchDistinctProp: () => switchDistinct(),
  switchLimitProp: () => switchLimit(),
  setLimitValueProp: limitValue => setLimitValue(limitValue),
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryColumnList);
