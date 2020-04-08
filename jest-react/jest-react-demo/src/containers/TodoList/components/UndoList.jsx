import React, { Component } from 'react';

class UndoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list, deleteItem } = this.props;
    return (
      <div className='undo-list'>
        <h1 className='undo-list-title'>
          To be finished
          <div data-test='count' className='undo-list-count'>
            {list.length}
          </div>
        </h1>

        <ul className='undo-list-content'>
          {list.map((item, index) => {
            return (
              <li
                className='undo-list-item'
                data-test='list-item'
                key={`${item}-${index}`}>
                {item}
                <div
                  className='undo-list-delete'
                  data-test='delete-item'
                  onClick={() => {
                    deleteItem(index);
                  }}>
                  X
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UndoList;
