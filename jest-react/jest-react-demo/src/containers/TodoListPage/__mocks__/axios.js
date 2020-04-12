const mockUndoList = {
  data: [
    {
      status: 'div',
      value: 'learn Jest',
    },
  ],
  success: true,
};

export default {
  get(url) {
    if (url === '/undoList.json') {
      return new Promise((resolve, reject) => {
        if (this.success) {
          //axios函数里的success对象，在测试用例里指定是否为成功
          resolve(mockUndoList);
        } else {
          reject(new Error());
        }
      });
    }
  },
};
