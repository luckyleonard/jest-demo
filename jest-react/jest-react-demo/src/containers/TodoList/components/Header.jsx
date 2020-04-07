import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }
  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }
  handleInputKeyUp(e) {
    const { value } = this.state;
    const { addUndoItem } = this.props;
    if (e.keyCode === 13 && value) {
      addUndoItem(value);
      this.setState({ value: '' });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className='header'>
        <div className='header-content'>
          TodoList
          <input
            placeholder='Input Todo'
            className='header-input'
            data-test='input'
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    );
  }
}

export default Header;
