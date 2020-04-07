import React, { Component } from 'react';

class UndoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list, deleteItem } = this.props;
    return (
      <div>
        <div data-test='count'>{list.length}</div>
        <ul>
          {list.map((item, index) => {
            return (
              <li data-test='list-item' key={`${item}-${index}`}>
                {item}
                <span
                  data-test='delete-item'
                  onClick={() => {
                    deleteItem(index);
                  }}>
                  X
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UndoList;
