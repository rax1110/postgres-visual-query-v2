import { filterTable } from '../../utils/filterTable';

describe('filterTable tests', () => {
  const table = {
    table_schema: 'information_schema',
    table_name: 'sql_features',
    table_type: 'BASE TABLE',
  };

  test('filterTable to return true for no expression', () => {
    const filterExpression = '';
    const isFiltered = filterTable(table, filterExpression);

    expect(isFiltered).toEqual(true);
  });

  test('filterTable to return false for empty expression', () => {
    const filterExpression = ' ';
    const isFiltered = filterTable(table, filterExpression);

    expect(isFiltered).toEqual(false);
  });

  test('filterTable to return true if table name is correct', () => {
    const filterExpression = 'sql_features';
    const isFiltered = filterTable(table, filterExpression);

    expect(isFiltered).toEqual(true);
  });

  test('filterTable to return true if search is based on table type (using #)', () => {
    const filterExpression = '#BASE_TABLE';
    const isFiltered = filterTable(table, filterExpression);

    expect(isFiltered).toEqual(true);
  });
});
