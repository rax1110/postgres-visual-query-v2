import _ from 'lodash';

export const filterTable = (table, expr) => {
  if (_.isEqual('', expr)) {
    return true;
  }

  const splitExpr = _.split(expr, ' ', 2);

  if (_.startsWith(expr, '#')) {
    let tableType = _.upperCase(table.table_type);

    tableType = _.replace(tableType, ' ', '_');

    if (_.includes(`#${tableType}`, splitExpr[0])) {
      if (_.isString(splitExpr[1]) && !_.isEqual('', splitExpr[1])) {
        if (_.endsWith(expr, ' ')) {
          splitExpr[1] = _.trim(splitExpr[1]);
          if (!_.isEqual(table.table_name, splitExpr[1])) {
            return false;
          }
        } else if (!_.includes(table.table_name, splitExpr[1])) {
          return false;
        }
      }
      return true;
    }
  } else if (_.endsWith(expr, ' ')) {
    expr = _.trim(expr);

    if (_.isEqual(table.table_name, expr)) {
      return true;
    }
  } else if (_.includes(table.table_name, expr)) {
    return true;
  }
  return false;
};
