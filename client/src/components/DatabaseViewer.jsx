import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import DatabaseTable from './DatabaseTable';
import { filterTable } from '../utils/filterTable';

export const DatabaseViewer = (props) => {
  const constructData = (table) => {
    const data = {
      table_schema: table.table_schema,
      table_name: table.table_name,
      table_type: table.table_type,
      table_alias: '',
    };

    let constraints = JSON.parse(JSON.stringify(props.constraints));

    constraints = constraints.filter(constraint => constraint.table_schema === data.table_schema
      && constraint.table_name === data.table_name);

    let columns = JSON.parse(JSON.stringify(props.columns));

    columns = columns.filter(column => column.table_name === data.table_name
      && column.table_schema === data.table_schema).map((column) => {
      const col = column;

      col.constraints = constraints.filter(
        constraint => _.includes(constraint.column_name, column.column_name),
      );

      delete col.table_name;
      delete col.table_schema;
      return col;
    });

    data.columns = columns;

    return data;
  };

  return (
    <div className="flex-fill">
      <Scrollbars className="d-flex" autoHide>
        <div className="mt-1 pr-2">
          {props.tables.map((table, index) => {
            const checked = props.queryTable.some(
              queryTable => _.isEqual(table.table_name, queryTable.table_name)
                && _.isEqual(table.table_schema, queryTable.table_schema),
            );

            const id = `database-table-${index}`;

            return table.table_schema === props.selectedSchema
              && filterTable(table, props.searchExpr)
              && (
                <DatabaseTable
                  data={constructData(table)}
                  checked={checked}
                  key={id}
                  id={id}
                />
              );
          })}
        </div>
      </Scrollbars>
    </div>
  );
};

DatabaseViewer.propTypes = {
  data: PropTypes.shape({ table_type: PropTypes.string, table_name: PropTypes.string }),
  constraints: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  tables: PropTypes.arrayOf(PropTypes.shape({})),
  queryTable: PropTypes.arrayOf(PropTypes.shape({})),
  selectedSchema: PropTypes.string,
  searchExpr: PropTypes.string,
};

const mapStateToProps = store => ({
  tables: store.database.tables,
  schemas: store.database.schemas,
  selectedSchema: store.database.selectedSchema,
  constraints: store.database.constraints,
  columns: store.database.columns,
  queryTable: store.query.tables,
  searchExpr: store.database.searchExpr,
});

export default connect(mapStateToProps)(DatabaseViewer);
