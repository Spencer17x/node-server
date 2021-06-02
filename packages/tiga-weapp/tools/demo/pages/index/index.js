Page({
  data: {
    list: [],
  },

  /**
   * 下拉加载
   * @param e
   */
  refresh(e) {
    setTimeout(() => {
      console.log(e);
      e.detail.end();
      wx.showLoading()
    }, 3000)
  },

  /**
   * 触底加载
   */
  bindscrolltolower() {
    this.fetchList();
  },

  fetchList() {
    return new Promise(resolve => {
      wx.showLoading({
        mask: true
      });
      setTimeout(() => {
        this.setData({
          list: this.data.list.concat(
            Array.from(Array(10))
          )
        }, () => {
          wx.hideLoading();
        })
      }, 3000)
    })
  },

  render() {
    this.setData({
      list: Array.from(Array(20)).map(() => 'Hello World')
    });
  },
  
  onLoad() {
    this.render()
  }
})
