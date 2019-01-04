import React, { PureComponent } from 'react';
import { 
  WriterTopTitle,  
  WriterSwitch, 
  WriterItem, 
  WriterWarpper,
  WriterFollow
 } from '../style';
import { connect } from 'react-redux';

class Writer extends PureComponent {
  render(){
    const { list } = this.props;
    return (
      <div>
        <WriterTopTitle>
          推荐作者
          <WriterSwitch>
                  <i className="iconfont Spin">&#xe851;</i>
                  换一批
          </WriterSwitch>
        </WriterTopTitle>
        <WriterWarpper>
          {
            list.map((item) => { 
              return (
                <WriterItem key={item.get('id')}>
                  <img className='portrait' alt='' src={item.get('imgUrl')} />
                  <a href='/' className='name'>{item.get('name')}</a>
                  <WriterFollow>
                    <i className='iconfont follow'>&#xe617;</i>
                    关注
                  </WriterFollow>
                  <p className='count'>写了{item.get('num')}字 · {item.get('star')}喜欢</p>
                </WriterItem>
              )
              })
          }
        </WriterWarpper>
      </div>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'writerList'])
})

export default connect(mapState)(Writer);