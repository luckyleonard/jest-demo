import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils';

it('<Header/> should match the snapshot', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

it('<Header/> should have a input field', () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, 'input');
  expect(inputElem).toExist();
});

it('the input field in <Header/> should be empty', () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, 'input');
  expect(inputElem.prop('value')).toEqual('');
});

it('the content in <Header/> should be changed after input values', () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, 'input');
  const userInput = 'I am typing sth';
  inputElem.simulate('change', {
    target: { value: userInput },
  });
  expect(wrapper.state('value')).toEqual(userInput);

  // const newInputElem = findTestWrapper(wrapper,'input');
  // expect(newInputElem.prop('value')).toBe(userInput);
});

it('no operate after clicking enter, with no content in the <Header/>', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, 'input');
  wrapper.setState({ value: '' });
  inputElem.simulate('keyup', {
    keyCode: 13,
  });
  expect(fn).not.toHaveBeenCalled();
});

it('call the function after clicking enter, with contents in the <Header/>', () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, 'input');
  const userInput = 'Learn Jest';
  wrapper.setState({ value: userInput });
  inputElem.simulate('keyup', {
    keyCode: 13,
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith(userInput);
  const newInputElem = findTestWrapper(wrapper, 'input');
  expect(newInputElem.prop('value')).toBe('');
});
