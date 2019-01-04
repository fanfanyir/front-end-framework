import React, {Component, Fragment} from 'react';
import { CSSTransition, TransitionGroup } from  'react-transition-group';   // 动画组件
import './style.css';


class ReactCss extends Component {

  constructor(props){
    super(props)
    this.state = {
      list: []
    }

    // this.state = {
    //   show: true
    // }
    // this.handleToggole = this.handleToggole.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  render(){
    return (
      <Fragment>
        <TransitionGroup>
          {
            this.state.list.map((item,index) => {
              return (
                <CSSTransition
                  timeout={1000}
                  unmountOnExit
                  onEntered={(el) => {el.style.color='blue'}}
                  classNames='fade'
                  appear={true}
                  key={index}
                >
                <div key={index}>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>

        {/* <CSSTransition
          in={this.state.show}
          timeout={1000}
          unmountOnExit
          onEntered={(el) => {el.style.color='blue'}}
          classNames='fade'
          appear={true}
        >
          <div>hello</div>
        </CSSTransition> */}

        {/* <div className={this.state.show ? "show":"hide"}>hello</div> */}
        {/* <button onClick={this.handleToggole}>toggle</button> */}
        <button onClick={this.handleAddItem}>toggle</button>
      </Fragment>
    )
  }

  handleToggole(){
    this.setState({
      show: this.state.show ? false : true
    })
  }

  handleAddItem(){
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
}

export default ReactCss;