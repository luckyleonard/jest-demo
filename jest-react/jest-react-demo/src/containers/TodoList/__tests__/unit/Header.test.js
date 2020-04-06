import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });

it('<Header/> should have a input field', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem).toExist();
});

it('the input field in <Header/> should be empty', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem.prop('value')).toEqual('');
});

it('the content in <Header/> should be changed after input values', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  const userInput = 'I am typing sth';
  inputElem.simulate('change', {
    target: { value: userInput },
  });
  expect(wrapper.state('value')).toEqual(userInput);

  // const newInputElem = wrapper.find("[data-test='input']");
  // expect(newInputElem.prop('value')).toBe(userInput);
});

it('no operate after clicking enter, with no content in the <Header/>', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({ value: '' });
  inputElem.simulate('keyup', {
    keyCode: 13,
  });
  expect(fn).not.toHaveBeenCalled();
});

it('call the function after clicking enter, with contents in the <Header/>', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = wrapper.find("[data-test='input']");
  const userInput = 'Learn Jest';
  wrapper.setState({ value: userInput });
  inputElem.simulate('keyup', {
    keyCode: 13,
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith(userInput);
  const newInputElem = wrapper.find("[data-test='input']");
  expect(newInputElem.prop('value')).toBe('');
});
