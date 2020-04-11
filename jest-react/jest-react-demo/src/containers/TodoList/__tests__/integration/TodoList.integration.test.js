import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findTestWrapper } from '../../../../utils/testUtils';
import TodoList from '../../index';
import store from '../../../../store/createStore';

beforeEach(() => {
  jest.useFakeTimers();
}); //防止各测试用例的timer互相影响

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

/*约定的数据格式
    {
      data:[{
        status : 'div',
        value: 'learn Jest'
      }],
      success : true
    }
  */
it(`
  1. User open the page
  2. Page should display the data from request
`, (done) => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  jest.runAllTimers(); //启动快速运行计时器
  process.nextTick(() => {
    //console.log(wrapper.debug());
    wrapper.update();
    //console.log(wrapper.debug());
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(listItem.length).toBe(1);
    done();
  });
});
