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

  it('addUndoItem() should add userInput to undoList', () => {
    // const Header = wrapper.find('Header');
    // const addFunc = Header.prop('addUndoItem');
    // addFunc(userInput);
    const userInput = 'Learn Jest';
    // wrapper.instance().addUndoItem(userInput);
    const { addUndoItem } = wrapper.instance();
    addUndoItem(userInput); //优化一下写法
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: userInput,
    });
    addUndoItem(userInput);
    expect(wrapper.state('undoList').length).toBe(2);
  });

  it('should pass list, deleteItem(), changeStatus(), handleBlur(), valueChange() to <UndoList/> ', () => {
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
    expect(UndoList.prop('changeStatus')).toBeTruthy();
    expect(UndoList.prop('handleBlur')).toBeTruthy();
    expect(UndoList.prop('valueChange')).toBeTruthy();
  });

  it('deleteItem() should delete the index of undoList', () => {
    const inputData = [
      { status: 'div', value: 'Learn react' },
      { status: 'div', value: 'Learn Jest' },
      { status: 'div', value: 'Learn Unit test' },
    ];
    wrapper.setState({
      undoList: inputData,
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([inputData[0], inputData[2]]);
  }); //单元测试 只测这个方法对这个组件内的数据的影响 不用管下一层组件 UndoList

  it('changeStatus() should change the status in the index of the undoList', () => {
    const inputData = [
      { status: 'div', value: 'Learn react' },
      { status: 'div', value: 'Learn Jest' },
      { status: 'div', value: 'Learn Unit test' },
    ];
    wrapper.setState({
      undoList: inputData,
    });
    wrapper.instance().changeStatus(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...inputData[1],
      status: 'input',
    });
  });

  it('handleBlur() should change the status in the index of the undoList', () => {
    const inputData = [
      { status: 'div', value: 'Learn react' },
      { status: 'input', value: 'Learn Jest' },
      { status: 'div', value: 'Learn Unit test' },
    ];
    wrapper.setState({
      undoList: inputData,
    });
    wrapper.instance().handleBlur(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...inputData[1],
      status: 'div',
    });
  });

  it('valueChange() should change the value in the index of the undoList', () => {
    const inputData = [
      { status: 'input', value: 'Learn Jest' },
      { status: 'div', value: 'Learn TDD' },
    ];
    wrapper.setState({
      undoList: inputData,
    });
    const value = 'Learn interesting things';
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...inputData[0],
      value,
    });
  });
});
