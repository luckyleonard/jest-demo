import React from 'react';
import { shallow } from 'enzyme';

import TodoList from '../../index';

it('<TodoList/> should have an empty list', () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state('undoList')).toEqual([]);
});

it('<TodoList/> should pass a callback to <Header/> to handle with undoList change', () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find('Header');
  expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
});

it('the thing from <Header/> should be add to undoList in <TodoList/>', () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find('Header');
  const addFunc = Header.prop('addUndoItem');
  const userInput = 'Learn Jest';
  addFunc(userInput);
  expect(wrapper.state('undoList').length).toBe(1);
  expect(wrapper.state('undoList')[0]).toEqual(userInput);
});
