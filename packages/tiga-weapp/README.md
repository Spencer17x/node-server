# weapp-pull-down-refresh

小程序自定义下拉刷新组件

# 安装

> npm/yarn install weapp-pull-down-refresh

# 使用

```wxml
<pull-down-refresh
  bindrefresh="onRefresh"
>
  <view 
    class="item"
    wx:for="{{ list }}"
    wx:key="index"  
  >Hello World</view>
</pull-down-refresh>
```

# api 

# 事件

|  属性   | 说明  | 默认值 | 
|  ----  | ----  | ---- |
| bindrefresh | 下拉刷新事件，注意：需要在下拉更新事件完成后调用e.detail.callback()的方式来通知组件更新完成。 | ---- |
