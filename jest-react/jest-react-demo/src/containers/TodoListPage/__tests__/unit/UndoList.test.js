import React from 'react';
import { shallow } from 'enzyme';

import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils';

describe('<UndoList/>', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when undoList is empty, the count should be 0 and nothing to show', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('0');
    expect(listItems.length).toBe(0);
  });

  it('when undoList is not empty , the count should be the length of the list and show detail', () => {
    const listData = [
      { status: 'div', value: 'Learn react' },
      { status: 'div', value: 'Learn Jest' },
    ];
    const wrapper = shallow(<UndoList list={listData} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('2');
    expect(listItems.length).toBe(2);
  });

  it('when undoList is not empty, there is a delete button', () => {
    const listData = [
      { status: 'div', value: 'Learn react' },
      { status: 'div', value: 'Learn Jest' },
    ];
    const wrapper = shallow(<UndoList list={listData} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    expect(deleteItems.length).toBe(2);
  });

  it('click the delete button, it will call deleteItem function', () => {
    const listData = [
      { status: 'div', value: 'Learn react' },
      { status: 'div', value: 'Learn Jest' },
    ];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    deleteItems.at(index).simulate('click', { stopPropagation: () => {} }); // simulate delete 'Learn Jest'
    expect(fn).toHaveBeenCalledWith(index); // 这里会执行回调函数，使用这个数组的index作为回传参数
  });

  it('when click the undoItem, it will launch changeStatus()', () => {
    const listData = [
      { status: 'div', value: 'Learn react' },
      { status: 'div', value: 'Learn Jest' },
    ];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList list={listData} changeStatus={fn} />);
    const editItems = findTestWrapper(wrapper, 'list-item');
    editItems.at(index).simulate('click'); // simulate delete 'Learn Jest'
    expect(fn).toHaveBeenCalledWith(index); // 这里会执行回调函数，使用这个数组的index作为回传参数
  });

  it('when status is input, it will show a input field', () => {
    const listData = [
      { status: 'div', value: 'Learn react' },
      { status: 'input', value: 'Learn Jest' },
      { status: 'div', value: 'Learn anything' },
    ];
    const wrapper = shallow(<UndoList list={listData} />);
    const inputItems = findTestWrapper(wrapper, 'input');
    expect(inputItems.length).toBe(1);
  });

  it('when blur, it will call handleBlur()', () => {
    const listData = [
      { status: 'div', value: 'Learn react' },
      { status: 'input', value: 'Learn Jest' },
      { status: 'div', value: 'Learn anything' },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<UndoList handleBlur={fn} list={listData} />);
    const inputItems = findTestWrapper(wrapper, 'input');
    inputItems.simulate('blur');
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('when type in the input, it will call valueChange()', () => {
    const listData = [{ status: 'input', value: 'Learn Jest' }];
    const value = 'Learn TDD';
    const fn = jest.fn();
    const wrapper = shallow(<UndoList valueChange={fn} list={listData} />);
    const inputItems = findTestWrapper(wrapper, 'input');
    inputItems.simulate('change', {
      target: { value },
    });
    expect(fn).toHaveBeenCalledWith(0, value);
  });
});
