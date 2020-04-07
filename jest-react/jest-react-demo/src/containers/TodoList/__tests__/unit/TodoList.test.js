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
  // expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
  expect(Header.prop('addUndoItem')).toBeTruthy();
});

it('addUndoItem should add userInput to undoList in <TodoList/>', () => {
  const wrapper = shallow(<TodoList />);
  // const Header = wrapper.find('Header');
  // const addFunc = Header.prop('addUndoItem');
  const userInput = 'Learn Jest';
  wrapper.instance().addUndoItem(userInput);
  // addFunc(userInput);
  expect(wrapper.state('undoList').length).toBe(1);
  expect(wrapper.state('undoList')[0]).toEqual(userInput);
});

it('<TodoList/> should pass list and deleteItem function <UndoList/> ', () => {
  const wrapper = shallow(<TodoList />);
  const UndoList = wrapper.find('UndoList');
  expect(UndoList.prop('list')).toBeTruthy();
  expect(UndoList.prop('deleteItem')).toBeTruthy();
});

it('deleteItem should delete the index of undoList in <TodoList/>', () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: ['Test case 1', 'Learn Jest', 'Learn React'],
  });
  wrapper.instance().deleteItem(1);
  expect(wrapper.state('undoList')).toEqual(['Test case 1', 'Learn React']);
}); //单元测试 只测这个方法对这个组件内的数据的影响 不用管下一层组件 UndoList
