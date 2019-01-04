import React, { Component, Fragment } from 'react';
import Header from './common/header';
import { GlobalStyle } from './style.js';
import { IconStyle } from './statics/iconfont/iconfont.js';
import store from './store';
import { Provider } from 'react-redux'; 

import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <GlobalStyle />
          <IconStyle />
          <BrowserRouter>
            <div>
              <Header/>
              <Route path='/' exact component={Home}></Route>
              {/* <Route path='/detail' exact component={Detail}></Route>   拼参时 */}

              {/* 动态路由 */}
              <Route path='/detail/:id' exact component={Detail}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/write' exact component={Write}></Route>
            </div>
          </BrowserRouter>
        </Provider>
      </Fragment>
    );
  }
}

export default App;
