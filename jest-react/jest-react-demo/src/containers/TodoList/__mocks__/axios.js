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
        resolve(mockUndoList);
      });
    }
  },
};
