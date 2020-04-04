import React from 'react';
import App from './App';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

test('Test <App> render a div with class name of App', () => {
  const wrapper = shallow(<App />);
  console.log(wrapper.debug());
  expect(wrapper.find('[data-test="app"]').length).toBe(1);
  expect(wrapper.find('[data-test="app"]').prop('title')).toBe('prop test');
  const container = wrapper.find('[data-test="app"]');
  expect(container).toExist();
  expect(container).toHaveProp('title', 'prop test');
});

test('Test <App> with snapshot', () => {
  const wrapper = mount(<App />);
  expect(wrapper).toMatchSnapshot();
});
