import React, { Component } from 'react';

// //ES6 结构赋值
// import { Component } from 'react'
// // 等价于
// import React from 'react'
// const Component = React.Component

import Todo from './components/todo/index.js';

class App extends Component {
  render() {
    return (
      <div>
        <Todo/>
      </div>
    );
  }
}

export default App;
