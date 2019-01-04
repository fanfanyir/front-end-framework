import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { withRouter } from 'react-router-dom';
import {
  DetailWrapper,
  Header,
  Content
} from './style';

class Detail extends PureComponent {
  render(){
  const { title, content } = this.props;
    return (
      <DetailWrapper>
        <Header>{title}</Header>
        <Content 
          dangerouslySetInnerHTML={{__html: content}}
        />
      </DetailWrapper>
    )
  }

  componentDidMount(){
    // this.props.getDetail(this.props.location.search);        //得到的是 "?id=2" 需要处理。---参数时
    this.props.getDetail(this.props.match.params.id);    //动态路由时
  }
}

const mapStateToProps = (state) => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content'])
});

const mapDispatchToProps = (dispatch) => ({
  getDetail(id){
    dispatch(actionCreators.getDetail(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));