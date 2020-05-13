import { validateSql } from '../../utils/validateQuery';

describe('validateQuery tests', () => {
  test('validateQuery to return true for empty SQL string', () => {
    const sqlString = '';
    const isValid = validateSql(sqlString);

    expect(isValid).toEqual(true);
  });

  test('validateQuery to return true for valid SQL string', () => {
    const sqlString = 'SELECT\n * FROM table';
    const isValid = validateSql(sqlString);

    expect(isValid).toEqual(true);
  });

  test('validateQuery to return false for invalid SQL string', () => {
    const sqlString = 'CREATE TABLE\n test()';
    const isValid = validateSql(sqlString);

    expect(isValid).toEqual(false);
  });
});
