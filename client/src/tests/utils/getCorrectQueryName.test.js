import { getCorrectQueryName } from '../../utils/getCorrectQueryName';

describe('getCorrectQueryName tests', () => {
  test('getCorrectQueryName to return correct query name in estonian', () => {
    const language = { code: 'est' };
    const queryName = '';
    const queryId = 1;

    expect(getCorrectQueryName(language, queryName, queryId)).toEqual('Päring 1');
  });

  test('getCorrectQueryName to return correct query name in english', () => {
    const language = { code: 'eng' };
    const queryName = '';
    const queryId = 2;

    expect(getCorrectQueryName(language, queryName, queryId)).toEqual('Query 2');
  });

  test('getCorrectQueryName to return custom query name', () => {
    const language = { code: 'eng' };
    const queryName = 'Custom Query 3000';
    const queryId = 5;

    expect(getCorrectQueryName(language, queryName, queryId)).toEqual('Custom Query 3000');
  });

  test('getCorrectQueryName to return main query name in estonian', () => {
    const language = { code: 'est' };
    const queryName = '';
    const queryId = 0;

    expect(getCorrectQueryName(language, queryName, queryId)).toEqual('Põhipäring');
  });

  test('getCorrectQueryName to return main query name in english', () => {
    const language = { code: 'eng' };
    const queryName = '';
    const queryId = 0;

    expect(getCorrectQueryName(language, queryName, queryId)).toEqual('Main');
  });
});
