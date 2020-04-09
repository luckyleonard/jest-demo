import React, { Component } from 'react';

class UndoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      list,
      deleteItem,
      changeStatus,
      handleBlur,
      valueChange,
    } = this.props;
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
                key={`${item.value}-${index}`}
                onClick={() => changeStatus(index)}>
                {item.status === 'div' ? (
                  item.value
                ) : (
                  <input
                    className='undo-list-input'
                    data-test='input'
                    value={item.value}
                    onBlur={() => handleBlur(index)}
                    onChange={(e) => valueChange(index, e.target.value)}
                  />
                )}
                <div
                  className='undo-list-delete'
                  data-test='delete-item'
                  onClick={(e) => {
                    e.stopPropagation();
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
