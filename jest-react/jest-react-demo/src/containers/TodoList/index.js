import React, { Component } from 'react';
import Header from './components/Header';
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addUndoItem = this.addUndoItem.bind(this);
    this.state = {
      undoList: [],
    };
  }
  addUndoItem(value) {
    this.setState({
      undoList: [...this.state.undoList, value],
    });
  }

  render() {
    const { undoList } = this.state;
    return (
      <>
        <Header addUndoItem={this.addUndoItem} />
        {undoList.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </>
    );
  }
}

export default TodoList;
