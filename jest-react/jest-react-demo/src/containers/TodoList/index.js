import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import UndoList from './components/UndoList';
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.state = {
      undoList: [],
    };
  }

  componentDidMount() {
    /*约定的数据格式
    {
      data:[{
        status : 'div',
        value: 'learn Jest'
      }],
      success : true
    }
    */
    setTimeout(() => {
      axios
        .get('/undoList.json')
        .then((res) => {
          //console.log(res);
          this.setState({
            undoList: res.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }, 5000);
  }

  addUndoItem(value) {
    this.setState({
      undoList: [
        ...this.state.undoList,
        {
          status: 'div',
          value,
        },
      ],
    });
  }

  deleteItem(index) {
    const { undoList } = this.state;
    const newList = [...undoList];
    newList.splice(index, 1);
    this.setState({ undoList: newList });
  }

  changeStatus(index) {
    const newList = this.state.undoList.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          status: 'input',
        };
      }
      return {
        ...item,
        status: 'div',
      };
    });
    this.setState({ undoList: newList });
  }

  handleBlur(index) {
    const newList = this.state.undoList.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          status: 'div',
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  }

  valueChange(index, value) {
    const newList = this.state.undoList.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  }

  render() {
    const { undoList } = this.state;
    return (
      <>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          list={undoList}
          deleteItem={this.deleteItem}
          changeStatus={this.changeStatus}
          handleBlur={this.handleBlur}
          valueChange={this.valueChange}
        />
      </>
    );
  }
}

export default TodoList;
