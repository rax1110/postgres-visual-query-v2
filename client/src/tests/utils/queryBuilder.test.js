import _ from 'lodash';
import * as queryBuilder from '../../utils/queryBuilder';
import { testData1, testData2, testData3, testData4 } from './testData';

describe('query builder', () => {
  test('add columns', () => {
    const data = _.cloneDeep(testData1);
    const query = queryBuilder.buildQuery(data);
    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
  });

  test('column name escaped correctly', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_name = 'Amet_kood';

    const expected = 'SELECT\n'
      + 'amet."Amet_kood", amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    const query = queryBuilder.buildQuery(data);

    expect(query).toEqual(expected);
  });

  test('table escaped correctly', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].table_name = 'Amet';
    data.columns[1].table_name = '"asd';
    data.tables[0].table_name = 'Amet';

    const expected = 'SELECT\n'
      + '"Amet".amet_kood, """asd".nimetus, amet.kirjeldus\n'
      + 'FROM public."Amet";';

    const query = queryBuilder.buildQuery(data);

    expect(query).toEqual(expected);
  });

  test('column add alias and escaped correctly', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_alias = 'AsD';

    const expected = 'SELECT\n'
      + 'amet.amet_kood AS "AsD", amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    const query = queryBuilder.buildQuery(data);

    expect(query).toEqual(expected);
  });

  test('table add alias and escaped correctly', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].table_alias = 'AsD';
    data.tables[0].table_alias = 'AsD';
    const expected = 'SELECT\n'
      + '"AsD".amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet AS "AsD";';

    const query = queryBuilder.buildQuery(data);

    expect(query).toEqual(expected);
  });

  test('add DISTINCT', () => {
    const data = _.cloneDeep(testData1);

    data.distinct = true;

    const query = queryBuilder.buildQuery(data);
    const expected = 'SELECT\n'
      + 'DISTINCT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
  });

  test('add ORDER BY', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_order = true;

    let query = queryBuilder.buildQuery(data);
    let expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'ORDER BY amet.amet_kood ASC;';

    expect(query).toEqual(expected);

    data.columns[0].column_order_dir = false;

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'ORDER BY amet.amet_kood DESC;';

    expect(query).toEqual(expected);

    data.columns[0].table_alias = 'qwe';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'qwe.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'ORDER BY qwe.amet_kood DESC;';

    expect(query).toEqual(expected);

    data.columns[0].column_alias = 'asd';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'qwe.amet_kood AS asd, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'ORDER BY asd DESC;';

    expect(query).toEqual(expected);

    data.columns[0].display_in_query = false;

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'ORDER BY asd DESC;';

    expect(query).toEqual(expected);
  });

  test('add DISTINCT ON', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_distinct_on = true;

    const query = queryBuilder.buildQuery(data);
    const expected = 'SELECT\n'
      + 'DISTINCT ON (amet.amet_kood)\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
  });

  test('add function', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_aggregate = 'SUM';

    let query = queryBuilder.buildQuery(data);
    let expected = 'SELECT\n'
      + 'SUM(amet.amet_kood), amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);

    data.columns[0].column_alias = 'qew';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'SUM(amet.amet_kood) AS qew, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
    data.columns[0].column_alias = '';
    data.columns[0].table_alias = 'asd';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'SUM(asd.amet_kood), amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);

    data.columns[0].column_alias = 'qew';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'SUM(asd.amet_kood) AS qew, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
  });

  test('add GROUP BY', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_group_by = true;

    let query = queryBuilder.buildQuery(data);
    let expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'GROUP BY amet.amet_kood;';

    expect(query).toEqual(expected);

    data.columns[0].column_alias = 'asd';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'amet.amet_kood AS asd, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'GROUP BY amet.amet_kood;';

    expect(query).toEqual(expected);

    data.columns[0].table_alias = 'qwe';

    query = queryBuilder.buildQuery(data);
    expected = 'SELECT\n'
      + 'qwe.amet_kood AS asd, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'GROUP BY qwe.amet_kood;';

    expect(query).toEqual(expected);
  });

  test('add filter', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 3';

    let query = queryBuilder.buildQuery(data);

    let expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 3);';

    expect(query).toEqual(expected);

    data.columns[0].table_alias = 'asd';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'asd.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (asd.amet_kood > 3);';

    expect(query).toEqual(expected);

    data.columns[0].column_alias = 'qwe';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'asd.amet_kood AS qwe, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (asd.amet_kood > 3);';

    expect(query).toEqual(expected);
  });

  test('add join', () => {
    const data = _.cloneDeep(testData2);

    let query = queryBuilder.buildQuery(data);

    let expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'INNER JOIN public.isiku_seisundi_liik ON (isiku_seisundi_liik.isiku_seisundi_liik_kood =\n'
      + '             isik.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].main_table.table_alias = 'asd';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'INNER JOIN public.isiku_seisundi_liik AS asd ON (asd.isiku_seisundi_liik_kood =\n'
      + '             isik.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].conditions[0].secondary_table.table_alias = 'qwe';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'INNER JOIN public.isiku_seisundi_liik AS asd ON (asd.isiku_seisundi_liik_kood =\n'
      + '             qwe.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].type = 'right';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'RIGHT JOIN public.isiku_seisundi_liik AS asd ON (asd.isiku_seisundi_liik_kood =\n'
      + '             qwe.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].type = 'left';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'LEFT JOIN public.isiku_seisundi_liik AS asd ON (asd.isiku_seisundi_liik_kood =\n'
      + '             qwe.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].type = 'outer';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'OUTER JOIN public.isiku_seisundi_liik AS asd ON (asd.isiku_seisundi_liik_kood =\n'
      + '             qwe.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].type = 'cross';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'CROSS JOIN public.isiku_seisundi_liik AS asd ON (asd.isiku_seisundi_liik_kood =\n'
      + '             qwe.isiku_seisundi_liik_kood);';

    expect(query).toEqual(expected);

    data.joins[0].type = 'badInput';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik;';

    expect(query).toEqual(expected);
  });

  test('join not completed', () => {
    const data = _.cloneDeep(testData3);

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik;';

    expect(query).toEqual(expected);
  });

  test('query with 2 filters joined by OR', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_filter_operand = 'OR';
    data.columns[1].column_filter = ':c > 2';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 OR amet.nimetus > 2);';

    expect(query).toEqual(expected);
  });

  test('do not add filter operand to last column', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_filter_operand = 'OR';
    data.columns[1].column_filter = ':c > 2';
    data.columns[1].column_filter_operand = 'AND';
    data.columns[2].column_filter = ':c > 3';
    data.columns[1].column_filter_operand = 'AND NOT';
    data.columns[2].column_filter = ':c > 4';
    data.columns[2].column_filter_operand = 'NOT ADDED';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 OR amet.nimetus > 2 AND NOT amet.kirjeldus > 4);';

    expect(query).toEqual(expected);
  });

  test('query with 2 filters joined by AND and second query having linked subquery', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_filter_operand = 'AND';
    data.columns[1].column_filter = ':c IN';
    data.columns[1].subquerySql = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik;';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 AND amet.nimetus IN (SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik));';

    expect(query).toEqual(expected);
  });

  test('query with 2 filters one WHERE and one HAVING', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[1].column_filter = ':c > 2';
    data.columns[1].column_group_by = true;
    data.columns[1].filter_as_having = true;

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1)\n'
      + 'GROUP BY amet.nimetus\n'
      + 'HAVING (amet.nimetus > 2);';

    expect(query).toEqual(expected);
  });

  test('query using aggregate function and having', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_aggregate = 'COUNT';
    data.columns[0].filter_as_having = true;

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'COUNT(amet.amet_kood), amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'HAVING (COUNT(amet.amet_kood) > 1);';

    expect(query).toEqual(expected);
  });

  test('query with 2 filters, using aggregate function and having', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_aggregate = 'COUNT';
    data.columns[0].filter_as_having = true;
    data.columns[0].column_filter_operand = 'AND NOT';
    data.columns[1].column_filter = ':c > 2';
    data.columns[1].column_aggregate = 'AVG';
    data.columns[1].filter_as_having = true;

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'COUNT(amet.amet_kood), AVG(amet.nimetus), amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'HAVING (COUNT(amet.amet_kood) > 1 AND NOT AVG(amet.nimetus) > 2);';

    expect(query).toEqual(expected);
  });

  test('query using subquery as filter', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_filter_operand = 'AND';
    data.columns[0].subquerySql = 'SELECT\n'
      + 'tableX\n'
      + 'FROM columnY;';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 (SELECT\n'
      + 'tableX\n'
      + 'FROM columnY));';

    expect(query).toEqual(expected);
  });

  test('query using 2 subquery filters', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1';
    data.columns[0].column_filter_operand = 'AND';
    data.columns[0].subquerySql = 'SELECT\n'
      + 'tableX\n'
      + 'FROM columnY;';
    data.columns[1].column_filter = ':c > 2';
    data.columns[1].column_filter_operand = 'OR';
    data.columns[1].subquerySql = 'SELECT\n'
      + 'tableZ\n'
      + 'FROM columnC;';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 (SELECT\n'
      + 'tableX\n'
      + 'FROM columnY) AND amet.nimetus > 2 (SELECT\n'
      + 'tableZ\n'
      + 'FROM columnC));';

    expect(query).toEqual(expected);
  });

  test('leading AND, OR operators should be removed', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1 AND';
    data.columns[1].column_filter = ':c > 2 OR';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 AND  amet.nimetus > 2);';

    expect(query).toEqual(expected);
  });

  test('leading AND NOT, OR NOT operators should be removed', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].column_filter = ':c > 1 AND NOT';
    data.columns[1].column_filter = ':c > 2 OR NOT';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'WHERE (amet.amet_kood > 1 AND NOT  amet.nimetus > 2);';

    expect(query).toEqual(expected);
  });

  test('query not displayed but using aggregate function', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].display_in_query = false;
    data.columns[0].column_aggregate = 'COUNT';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'COUNT(*), amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
  });

  test('query not displayed but using aggregate function and alias', () => {
    const data = _.cloneDeep(testData1);

    data.columns[0].display_in_query = false;
    data.columns[0].column_alias = 'test';
    data.columns[0].column_aggregate = 'AVG';

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'AVG(*) AS test, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet;';

    expect(query).toEqual(expected);
  });

  test('build set query', () => {
    const data = _.cloneDeep(testData4);

    let query = queryBuilder.buildQuery(data);

    let expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'UNION\n'
      + 'SELECT\n'
      + '*\n'
      + 'FROM public.hotell;';

    expect(query).toEqual(expected);

    data.sets[0].type = 'unionall';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'UNION ALL\n'
      + 'SELECT\n'
      + '*\n'
      + 'FROM public.hotell;';

    expect(query).toEqual(expected);

    data.sets[0].type = 'intersect';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'INTERSECT\n'
      + 'SELECT\n'
      + '*\n'
      + 'FROM public.hotell;';

    expect(query).toEqual(expected);

    data.sets[0].type = 'except';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik\n'
      + 'EXCEPT\n'
      + 'SELECT\n'
      + '*\n'
      + 'FROM public.hotell;';

    expect(query).toEqual(expected);

    data.sets[0].type = 'invalid';

    query = queryBuilder.buildQuery(data);

    expected = 'SELECT\n'
      + 'isik.isik_id, isik.riik_kood\n'
      + 'FROM public.isik;';

    expect(query).toEqual(expected);
  });

  test('add LIMIT', () => {
    const data = _.cloneDeep(testData1);
    data.limit = true;
    data.limitValue = 10;

    const query = queryBuilder.buildQuery(data);

    const expected = 'SELECT\n'
      + 'amet.amet_kood, amet.nimetus, amet.kirjeldus\n'
      + 'FROM public.amet\n'
      + 'LIMIT 10;';

    expect(query).toEqual(expected);
  });
});
