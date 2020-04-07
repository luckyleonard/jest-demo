import React from 'react';
import { shallow } from 'enzyme';

import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils';

// it('<UndoList/> should match the snapshot', () => {
//   const wrapper = shallow(<UndoList />);
//   expect(wrapper).toMatchSnapshot();
// });

it('when undoList is an empty array, the count in <UndoList/> should be 0 and nothing to show', () => {
  const wrapper = shallow(<UndoList list={[]} />);
  const countElem = findTestWrapper(wrapper, 'count');
  const listItems = findTestWrapper(wrapper, 'list-item');
  expect(countElem.text()).toEqual('0');
  expect(listItems.length).toBe(0);
});

it('when undoList is not empty , the count in <UndoList/> should be the length of the list and show detail', () => {
  const listData = ['Learn react', 'Learn Jest'];
  const wrapper = shallow(<UndoList list={listData} />);
  const countElem = findTestWrapper(wrapper, 'count');
  const listItems = findTestWrapper(wrapper, 'list-item');
  expect(countElem.text()).toEqual('2');
  expect(listItems.length).toBe(2);
});

it('when <UndoList/> is not empty, there is a delete button', () => {
  const listData = ['Learn react', 'Learn Jest'];
  const wrapper = shallow(<UndoList list={listData} />);
  const deleteItems = findTestWrapper(wrapper, 'delete-item');
  expect(deleteItems.length).toBe(2);
});

it('when <UndoList/> is not empty, click the delete button, it will call deleteItem function', () => {
  const listData = ['Learn react', 'Learn Jest'];
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />);
  const deleteItems = findTestWrapper(wrapper, 'delete-item');
  deleteItems.at(index).simulate('click'); // simulate delete 'Learn Jest'
  expect(fn).toHaveBeenCalledWith(index); // 这里会执行回调函数，使用这个数组的index作为回传参数
});
