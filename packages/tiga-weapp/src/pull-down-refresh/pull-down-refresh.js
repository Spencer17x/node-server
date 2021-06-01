// components/pull-down-refresh.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    enabled: true,
    triggered: false,
    scrollY: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 下拉加载
     */
    bindrefresherrefresh() {
      this.setData({
        triggered: true
      }, () => {
        this.triggerEvent('refresh', {
          end: () => {
            this.setData({
              triggered: false
            })
          }
        });
      });
    },
    /**
     * 触底加载
     */
    bindscrolltolower() {
      this.triggerEvent('scrolltolower')
    }
  }
})
