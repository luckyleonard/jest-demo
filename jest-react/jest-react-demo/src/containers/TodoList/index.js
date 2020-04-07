import React, { Component } from 'react';
import Header from './components/Header';
import UndoList from './components/UndoList';
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      undoList: [],
    };
  }
  addUndoItem(value) {
    this.setState({
      undoList: [...this.state.undoList, value],
    });
  }
  deleteItem(index) {
    const { undoList } = this.state;
    const newList = [...undoList];
    newList.splice(index, 1);
    this.setState({ undoList: newList });
  }

  render() {
    const { undoList } = this.state;
    return (
      <>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={undoList} deleteItem={this.deleteItem} />
      </>
    );
  }
}

export default TodoList;
