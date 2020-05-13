import React from 'react';
import { shallow } from 'enzyme';
import { SetList } from '../../components/SetList';

describe('Component: SetList', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      sets: [
        {
          id: 0,
          subqueryId: 1,
        },
        {
          id: 1,
          subqueryId: 2,
        },
      ],
      tables: [],
      language: { code: 'eng' },
      queryId: 0,
      updateSets: jest.fn(),
      addSet: jest.fn(),
    };

    component = shallow(<SetList {...props} />);
  });

  test('SetList renders with default components', () => {
    expect(component).toMatchSnapshot();
  });

  test('SetList handleAddSet calls addSet once', () => {
    component.find('Button').first().simulate('click');

    expect(props.addSet).toBeCalled();
  });

  test('SetList onDragEnd calls updateSets once', () => {
    const result = {
      destination: {
        droppableId: 'drop-id-1',
        index: 0,
      },
      source: {
        droppableId: 'drop-id-2',
        index: 1,
      },
      draggableId: 'id-1',
    };

    component.find('DragDropContext').simulate('dragend', result);

    expect(props.updateSets).toBeCalled();
  });
});
