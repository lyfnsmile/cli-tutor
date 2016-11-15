---
title: react-router用法示例
date: 2016-07-21 11:10:09
tags: react_router
copyright: false
---
以下笔记全部基于react-router2.0，用于记录自己在学习react-router中涉及的各种API用法，考虑到react-router2.0变动有些大，可能有些代码在低版本的react-router会出现警告或是error。react-router是react框架唯一适用的路由解决方案，一个完整的react应用离不开路由的支持，因此十分有必要学习react-router的用法:

- 匹配当前路由而不包含父路由:
```
// 使用 
<IndexLink to="/" activeClassName="active">Home</IndexLink>
// 代替
<Link to="/" activeClassName="active">Home</Link>
```
如果使用 Link 的话, 进入任何一个 URL 都会激活 / 的active

使用 IndexLink 可以理解为 有且只有这个(/) url 匹配到才 active

此外还有一个activeStyle于此类似

这是官方的文档
[https://github.com/rackt/react-router/blob/master/docs/guides/basics/IndexRoutes.md](https://github.com/rackt/react-router/blob/master/docs/guides/basics/IndexRoutes.md)

### react-router组件嵌套。
```
<Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={ItemList} /> 
        <Route path="/about" component={About} /> 
        <Route path="/archives" component={Archives} /> 
        <Route path="/content" component={Content} />
        <Route path="/photography" component={Photography} />
        <Route path="/content/:pid" component={Content} />      
    </Route>
    <Route path="/admin" component={Admin}>
    </Route>
</Router>
```
上面代码中，用户访问根路径时，会先加载App组件，然后在它的内部默认加载加载ItemList组件。

App组件要写成下面的样子。
```
export default React.createClass({
  render() {
    return( <div>
                {this.props.children}
            </div>
        )
  }
})
```
上面代码中，App组件的this.props.children属性就是指APP组件下的所有子组件，与路由一起配合使用。

- 5/27更新
前几天就发现子路由页面刷新后，无法重新加载，出现404错误，只能返回到根路径下才可以。查了好久资料发现[阮一峰老师的博客](http://www.ruanyifeng.com/blog/2016/05/react_router.html)中找到了解决办法，于是记录下来。

`原来是我使用webpack导致的，只需要在启动webpack-dev-server时，加上--history-api-fallback参数就可以了。`
### url中传递参数

- 在link的to属性中传递参数的方法如下:
```
<Link to = {{pathname:"category/"+cate._id,query:{name:cate.name}}} activeStyle = {{"color":"#000"}} >
    <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(cate.icon)}}/>
    <span className = "cateContent">{cate.name}</span>
</Link
```

### 获取参数
获取url中传递的参数在angular开发也遇到过，同样在使用reactjs时也碰到了这个需求，一下就是我通过查找资料得到的。

假如当我们访问inbox/messages/12345的时候，我们需要获取到相应的参数，然后从服务器获取对应的数据。当视图渲染的时候，路由组件会注入一些有用的属性到组件上，特别是一些从URL动态获取的参数信息，在我们这个示例里是：id
```
const Message = React.createClass({

  componentDidMount() {
    // from the path `/inbox/messages/:id`
    const id = this.props.params.id
    fetchMessage(id, function (err, message) {
      this.setState({ message: message })
    })
  },
})
```

    this.props.children: 嵌套组件
    this.props.params: url 参数
    this.props.query: url 请求参数

- 如果你想要获取查询字符串后面的值，例如获取/foo?bar=baz这个路由，可以通过this.props.location.query.bar获取bar的值baz

通过以上两个方法可以解决我们实际开发中遇到的很多问题。


### 绝对路径与相对路径

- 相对路径："page/1"
- 绝对路径 ："/page/1"