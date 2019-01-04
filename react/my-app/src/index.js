import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// // PWA progressive web application 通过写网页的形式写一些app应用
// // https 协议的服务器上     使用 serviceWorker 第一次需要联网，会把网页存储在浏览器，之后不需要联网也可以访问
// import * as serviceWorker from './serviceWorker';


// JSX  使用了 JSX 语法的话必须引入 React
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// serviceWorker.unregister();
