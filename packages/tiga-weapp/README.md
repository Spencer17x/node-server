# tiga-weapp

小程序通用组件

# 安装

```shell
$ npm/yarn install tiga-weapp
```

# 组件

## navigation-bar(自定义导航栏)

### 使用说明

引用方式：

```json
{
  "usingComponents": {
    "navigation-bar": "/path/navigation-bar/navigation-bar"
  }
}
```

### 示例代码

```wxml
<!--wxml-->
<navigation-bar
  status-bar-class="navigation-header1"
  weapp-bar-class="navigation-header2"
>
  <!--your code here-->
  <view class="header">Hello World</view>
</navigation-bar>
```

### api

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| placeholder | boolean | true | 由于一般导航栏都固定在顶部，所以导航栏为fix定位，脱离了标准文档流。当该值为true的时候，内容显示正常。当该值为false的时候，内容会被顶在最顶部 |
| zIndex | number | 1 | 导航栏的层级 |
| status-bar-class | string | - | 状态栏的class |
| weapp-bar-class | string | - | 带胶囊的导航栏的class |

## pull-down-refresh(下拉刷新+触底加载)

### 使用说明

引用方式：

```json
{
  "usingComponents": {
    "pull-down-refresh": "/path/pull-down-refresh/pull-down-refresh"
  }
}
```

### 示例代码

```wxml
<!--wxml-->
<pull-down-refresh
  bindrefresh="refresh"
  bindscrolltolower="bindscrolltolower"
>
  <!--your code here-->
  <view
    class="item"
    wx:for="{{ list }}"
    wx:key="index"
  >Hello World</view>
</pull-down-refresh>
```

### api

| 事件 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| bindrefresh | (e) => void | - | 下拉刷新事件，注：加载完成需要调用e.detail.end()来告知组件刷新完成 |
| bindscrolltolower | () => void | - | 触底加载，建议加载的时候wx.showLoading开启mask显示透明蒙层，防止触摸穿透 |

