import React from 'react';
import { shallow } from 'enzyme';

import TodoList from '../../index';

describe('<TodoList/> ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TodoList />);
  });

  it('should have an empty list', () => {
    expect(wrapper.state('undoList')).toEqual([]);
  });

  it('should pass a callback to <Header/> to handle with undoList change', () => {
    const Header = wrapper.find('Header');
    // expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
    expect(Header.prop('addUndoItem')).toBeTruthy();
  });

  it('addUndoItem should add userInput to undoList', () => {
    // const Header = wrapper.find('Header');
    // const addFunc = Header.prop('addUndoItem');
    // addFunc(userInput);
    const userInput = 'Learn Jest';
    // wrapper.instance().addUndoItem(userInput);
    const { addUndoItem } = wrapper.instance();
    addUndoItem(userInput); //优化一下写法
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual(userInput);
    addUndoItem(userInput);
    expect(wrapper.state('undoList').length).toBe(2);
  });

  it('should pass list and deleteItem function to <UndoList/> ', () => {
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
  });

  it('deleteItem should delete the index of undoList', () => {
    const inputData = ['Test case 1', 'Learn Jest', 'Learn React'];
    wrapper.setState({
      undoList: inputData,
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([inputData[0], inputData[2]]);
  }); //单元测试 只测这个方法对这个组件内的数据的影响 不用管下一层组件 UndoList
});
