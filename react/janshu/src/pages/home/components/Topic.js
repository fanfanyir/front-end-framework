import React, {PureComponent } from 'react';
import { connect } from 'react-redux';
import { 
  TopicWarpper,
  TopicItem
} from '../style';

class Topic extends PureComponent {
  render(){
    return (
      <TopicWarpper>
        {
          this.props.list.map((item) => {
            return (
              <TopicItem key={item.get('id')}>
                <img 
                  className='topic-pic'
                  alt=''
                  src={item.get('imgUrl')}
                />
                {item.get('title')}
            </TopicItem>
            )
          })
        }
      </TopicWarpper>
    )
  }
}
const mapState = (state) => ({
  list: state.getIn(['home', 'topicList'])
})

export default connect(mapState, null)(Topic);