# websocket chatroom
一个基于Vue.js, Socket.io, Node.JS的小型聊天室

### Install dependencies
>npm install

### Run
>node app.js

### Visit
>http://localhost:3000/

### Note
>滚动条置底要在下一次渲染实现  this.$nextTick()  
>>https://segmentfault.com/q/1010000007028422
 
>Vue不能检测如下数组变动 vm.items[indexOfItem] = newValue       
>>要用Vue封装的方法    
Vue.set(vm.items, indexOfItem, newValue)  
https://cn.vuejs.org/v2/guide/list.html#注意事项   


>防止xss攻击需要添加过滤器过滤
>>replace函数需要之前value为string属性 json数据先stringify  在parse取出  
Vue2.0取消v-model的过滤器，采用截取input传输的信息进行处理  
>>https://cn.vuejs.org/v2/guide/migration.html#双向过滤器-替换  
https://stackoverflow.com/questions/4775206/var-replace-is-not-a-function  


### 相关文档
Socket.io
> https://socket.io/  

Vue.js
>https://cn.vuejs.org/  
