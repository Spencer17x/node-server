Component({

  data: {
    statusBarHeight: 0, // 状态栏
    navigationBarHeight: 0,
  },

  properties: {
    placeholder: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      // https://www.jianshu.com/p/9822d9ee168e
      const { statusBarHeight } = wx.getSystemInfoSync();
      const capsuleButton = wx.getMenuButtonBoundingClientRect(); // 胶囊尺寸信息
      const gap = capsuleButton.top - statusBarHeight;
      this.setData({
        statusBarHeight,
        navigationBarHeight: gap * 2 + capsuleButton.height
      });
    }
  },

  externalClasses: ['status-bar-class', 'weapp-bar-class']
})