import * as _ from 'lodash';
import * as format from 'pg-format';
import * as squel from 'squel';

const squelPostgres = squel.useFlavour('postgres');

const addColumnsToQuery = (data, query) => {
  const columns = _.cloneDeep(data.columns);

  let whereQuery = '';
  let havingQuery = '';

  const addOrder = (column) => {
    if (_.isEmpty(column.table_alias)) {
      query.order(`${format.ident(column.table_name)}.${format.ident(column.column_name)}`,
        column.column_order_dir);
    } else {
      query.order(`${format.ident(column.table_alias)}.${format.ident(column.column_name)}`,
        column.column_order_dir);
    }
  };

  const addField = (table, column) => {
    query.field(`${format.ident(table)}.${format.ident(column)}`);
  };

  const addFieldWithAlias = (table, column, alias) => {
    query.field(`${format.ident(table)}.${format.ident(column)}`,
      `${format.ident(alias)}`);
  };

  const addGroupBy = (table, column) => {
    query.group(`${format.ident(table)}.${format.ident(column)}`);
  };

  const buildFilter = (column, index) => {
    let filtersValue = '';

    if (!_.isEmpty(column.column_filter)) {
      let columnName = `${format.ident(column.table_name)}.${format.ident(column.column_name)}`;

      if (!_.isEmpty(column.table_alias)) {
        columnName = `${format.ident(column.table_alias)}.${format.ident(column.column_name)}`;
      }

      const columnFilter = column.filter_as_having && column.column_aggregate
        ? _.replace(column.column_filter, /:c/g, `(${columnName})`)
        : _.replace(column.column_filter, /:c/g, columnName);

      const filterOperand = column.column_filter_operand;

      if (index !== columns.length - 1) {
        if (column.filter_as_having && column.column_aggregate) {
          filtersValue += `${column.column_aggregate}${columnFilter} ${filterOperand} `;
        } else if (column.subquerySql) {
          filtersValue += `${columnFilter}`;
        } else {
          filtersValue += `${columnFilter} ${filterOperand} `;
        }
      } else if (column.filter_as_having && column.column_aggregate) {
        filtersValue += `${column.column_aggregate}${columnFilter}`;
      } else {
        filtersValue += columnFilter;
      }

      if (column.subquerySql) {
        filtersValue += ` (${column.subquerySql.slice(0, -1)}) ${filterOperand} `;
      }
    }

    return filtersValue;
  };

  const cleanFinalFilter = (filterExpression) => {
    let finalFilter = filterExpression.trim().split(' ');

    const lastWord = finalFilter[finalFilter.length - 1];

    if (lastWord === 'AND' || lastWord === 'OR') {
      finalFilter = finalFilter.slice(0, -1);
    } else if (lastWord === 'NOT') {
      finalFilter = finalFilter.slice(0, -2);
    }

    return finalFilter.join(' ').trim();
  };

  columns.forEach((column, index) => {
    if (!data.distinct && column.column_distinct_on) {
      query.distinct(`${format.ident(column.table_name)}.${format.ident(column.column_name)}`);
    }

    if (column.display_in_query) {
      if (column.column_alias.length === 0) {
        if (column.table_alias.length === 0) {
          let field = `${column.column_name}`;

          if (column.column_aggregate.length === 0) {
            addField(column.table_name, column.column_name);
          } else {
            field = `${column.column_aggregate}(${column.table_name}.${field})`;
            query.field(field);
          }
        } else {
          let field = `${column.table_alias}.${column.column_name}`;

          if (column.column_aggregate.length === 0) {
            addField(column.table_alias, column.column_name);
          } else {
            field = `${column.column_aggregate}(${field})`;

            query.field(field);
          }
        }
      } else if (column.table_alias.length === 0) {
        let field = `${column.table_name}.${column.column_name}`;

        if (column.column_aggregate.length === 0) {
          addFieldWithAlias(column.table_name, column.column_name, column.column_alias);
        } else {
          field = `${column.column_aggregate}(${field})`;
          query.field(field, column.column_alias);
        }
      } else {
        let field = `${column.table_alias}.${column.column_name}`;

        if (column.column_aggregate.length === 0) {
          addFieldWithAlias(column.table_alias, column.column_name, column.column_alias);
        } else {
          field = `${column.column_aggregate}(${field})`;
          query.field(field, column.column_alias);
        }
      }
    }

    if (!column.display_in_query && column.column_aggregate) {
      if (!column.column_alias) {
        query.field(`${column.column_aggregate}(*)`);
      } else {
        query.field(`${column.column_aggregate}(*) AS ${column.column_alias}`);
      }
    }

    if (column.column_order) {
      if (_.isEmpty(column.column_alias)) {
        addOrder(column);
      } else {
        query.order(`${format.ident(column.column_alias)}`, column.column_order_dir);
      }
    }

    if (column.column_group_by) {
      if (_.isEmpty(column.table_alias)) {
        addGroupBy(column.table_name, column.column_name);
      } else {
        addGroupBy(column.table_alias, column.column_name);
      }
    }

    if (column.filter_as_having) {
      havingQuery += buildFilter(column, index);
    } else {
      whereQuery += buildFilter(column, index);
    }
  });
  query.where(cleanFinalFilter(whereQuery));
  query.having(cleanFinalFilter(havingQuery));
};

const buildJoinOn = (join) => {
  let mainTable = join.main_table.table_name;

  if (!_.isEmpty(join.main_table.table_alias)) {
    mainTable = join.main_table.table_alias;
  }

  const conditionArray = [];
  const conditions = _.cloneDeep(join.conditions);

  conditions.forEach((condition) => {
    if (!_.isEmpty(condition.main_column) && !_.isEmpty(condition.secondary_column)
      && !_.isEmpty(condition.secondary_table.table_name)) {
      let secondaryTable = condition.secondary_table.table_name;

      if (!_.isEmpty(condition.secondary_table.table_alias)) {
        secondaryTable = condition.secondary_table.table_alias;
      }

      const conditionString = `${format.ident(mainTable)}.${format.ident(condition.main_column)} =
             ${format.ident(secondaryTable)}.${format.ident(condition.secondary_column)}`;
      conditionArray.push(conditionString);
    }
  });
  return conditionArray.join(' AND ');
};

const addJoinsToQuery = (data, query) => {
  const joins = _.cloneDeep(data.joins);

  const addJoin = (joinObj, on, joinFn) => {
    if (!_.isEmpty(joinObj.main_table.table_alias)) {
      joinFn(`${format.ident(joinObj.main_table.table_schema)}.${format.ident(joinObj.main_table.table_name)}`,
        `${format.ident(joinObj.main_table.table_alias)}`, on);
    } else {
      joinFn(`${format.ident(joinObj.main_table.table_schema)}.${format.ident(joinObj.main_table.table_name)}`,
        null,
        on);
    }
  };

  joins.forEach((joinObj) => {
    const on = buildJoinOn(joinObj);

    if (!_.isEmpty(joinObj.main_table.table_name) && !_.isEmpty(on)) {
      switch (joinObj.type) {
        case 'inner': {
          addJoin(joinObj, on, query.join);
          break;
        }
        case 'right': {
          addJoin(joinObj, on, query.right_join);
          break;
        }
        case 'left': {
          addJoin(joinObj, on, query.left_join);
          break;
        }
        case 'outer': {
          addJoin(joinObj, on, query.outer_join);
          break;
        }
        case 'cross': {
          addJoin(joinObj, on, query.cross_join);
          break;
        }
        default:
          break;
      }
    }
  });
};

const buildSetQuery = (data) => {
  const sets = _.cloneDeep(data.sets);

  let setQuery = '';

  sets.forEach((set) => {
    const cleanSubquerySql = set.subquerySql.slice(0, -1);

    if (set.subquerySql.length) {
      switch (set.type) {
        case 'union': {
          setQuery += `\nUNION\n${cleanSubquerySql}`;
          break;
        }
        case 'unionall': {
          setQuery += `\nUNION ALL\n${cleanSubquerySql}`;
          break;
        }
        case 'intersect': {
          setQuery += `\nINTERSECT\n${cleanSubquerySql}`;
          break;
        }
        case 'except': {
          setQuery += `\nEXCEPT\n${cleanSubquerySql}`;
          break;
        }
        default:
          break;
      }
    }
  });

  return setQuery;
};

const addTablesToQuery = (data, query) => {
  const addTable = (table) => {
    if (_.isEmpty(table.table_alias)) {
      query.from(`${format.ident(table.table_schema)}.${format.ident(table.table_name)}`);
    } else {
      query.from(`${format.ident(table.table_schema)}.${format.ident(table.table_name)}`,
        `${format.ident(table.table_alias)}`);
    }
  };

  if (data.tables.length > 0) {
    const tables = _.cloneDeep(data.tables);

    if (_.isEmpty(data.joins)) {
      tables.forEach((table) => {
        addTable(table);
      });
    } else {
      addTable(tables[0]);
      addJoinsToQuery(data, query);
      buildSetQuery(data, query);
    }
  }
};

export const buildQuery = (data) => {
  const query = squelPostgres.select({
    useAsForTableAliasNames: true,
    fieldAliasQuoteCharacter: '',
    tableAliasQuoteCharacter: '',
    nameQuoteCharacter: '"',
    separator: '\n',
  });

  if (data.distinct) {
    query.distinct();
  }

  if (data.limit && data.limitValue) {
    query.limit(data.limitValue);
  }

  addColumnsToQuery(data, query);
  addTablesToQuery(data, query);

  const setQueryString = buildSetQuery(data);

  return `${query}${setQueryString};`;
};
