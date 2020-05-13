import { iconPicker } from '../../utils/iconPicker';

describe('iconPicker tests', () => {
  test('iconPicker to return pargraph icon', () => {
    const dataType = 'text';

    expect(iconPicker(dataType)).toEqual('paragraph');
  });

  test('iconPicker to return hashtag icon', () => {
    const dataType = 'integer';

    expect(iconPicker(dataType)).toEqual('hashtag');
  });

  test('iconPicker to return toggle-off icon', () => {
    const dataType = 'boolean';

    expect(iconPicker(dataType)).toEqual('toggle-off');
  });

  test('iconPicker to return calendar-alt icon', () => {
    const dataType = 'timestamp without time zone';

    expect(iconPicker(dataType)).toEqual('calendar-alt');
  });

  test('iconPicker to return font icon', () => {
    const dataType = 'character varying';

    expect(iconPicker(dataType)).toEqual('font');
  });

  test('iconPicker to return question-circle icon when data type unknown', () => {
    const dataType = 'unknown';

    expect(iconPicker(dataType)).toEqual('question-circle');
  });
});
