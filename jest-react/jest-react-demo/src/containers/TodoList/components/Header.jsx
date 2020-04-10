import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }

  handleInputKeyUp(e) {
    const { value, addUndoItem, handleInputChange } = this.props;
    if (e.keyCode === 13 && value) {
      addUndoItem(value);
      handleInputChange('');
    }
  }

  render() {
    const { value, handleInputChange } = this.props;
    return (
      <div className='header'>
        <div className='header-content'>
          TodoList
          <input
            placeholder='Input Todo'
            className='header-input'
            data-test='input'
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    value: state.todo.inputValue,
  };
};

const mapDispatch = (dispatch) => ({
  handleInputChange(value) {
    dispatch(actions.changeInputValue(value));
  },
});
export default connect(mapState, mapDispatch)(Header);
