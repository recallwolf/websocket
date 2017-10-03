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
 
>Vue不能检测如下数组变动 vm.items[indexOfItem] = newValue       
>>要用Vue封装的方法   
Vue.set(vm.items, indexOfItem, newValue)

### 相关文档
Socket.io
> https://socket.io/  

Vue.js
>https://cn.vuejs.org/  
