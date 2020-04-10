import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findTestWrapper } from '../../../../utils/testUtils';
import TodoList from '../../index';
import store from '../../../../store/createStore';

it(`
  1. User input content in <Header/>
  2. User click enter
  3. List show the content which user input
`, () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  const inputElem = findTestWrapper(wrapper, 'input');
  const content = 'Learn BDD';
  inputElem.simulate('change', {
    target: { value: content },
  });
  inputElem.simulate('keyUp', {
    keyCode: 13,
  });
  const listItem = findTestWrapper(wrapper, 'list-item');
  expect(listItem.length).toEqual(1);
  expect(listItem.text()).toContain(content);
  //因为删除按钮里的内容也会被当成文字渲染，所以需要使用contain
});
