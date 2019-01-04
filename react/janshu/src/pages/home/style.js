import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  overflow: hidden;
`;

export const HomeLeft = styled.div`
  width: 625px;
  margin-left: 15px;
  padding-top: 30px;
  float: left;  
  .banner-img{
    width: 625px;
    height: 270px;
  }
`;

export const HomeRight = styled.div`
  width: 280px;
  float: right;  
  padding-top: 30px;
`;

export const TopicWarpper = styled.div`
  overflow: hidden;
  padding: 20px 0 10px 0;
  margin-left: -18px;
  border-bottom:1px solid #dcdcdc;
`;

export const TopicItem = styled.div`
  float: left;
  height: 32px;
  line-height: 32px;
  margin-left: 18px;
  margin-bottom: 18px;
  font-size: 14px;
  background: #f7f7f7;
  color: #000;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding-right: 10px;
  .topic-pic {
    display: block;   /* 这两句可以让图片不影响文字的line-height*/
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`;

export const ListItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #dcdcdc;
  overflow: hidden;
  .pic{
    display: block;
    width: 125px;
    height: 100px;
    float: right;
  }

`;

export const ListInfo = styled.div`
  width: 500px;
  float: left;
  .title{
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .desc{
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
`;

export const RecommendWrapper = styled.div`
	width: 280px;
`;

export const RecommendItem = styled.div`
  margin-bottom:  20px;
  border-radius: 4px;
	width: 280px;
	height: 50px;
	background: url(${(props) => props.imgUrl});
	/* background-size: contain; */
`;

export const WriterTopTitle = styled.div`
    overflow: hidden;
    width: 280px;
    padding-top: 12px;
    color: #969696;
`;

export const WriterSwitch = styled.div`
    float: right;
    font-size: 13px;
    cursor: pointer;
    .spin{
        display: block;
        float: left;
        font-size: 12px;
        transition: all .2s ease-in;
        transform-origin: center center;  /* 旋转中心*/
    }
`;

export const WriterWarpper = styled.ul`
  overflow: hidden;
  padding: 10px 0 10px 0;
  width: 280px;
`;

export const WriterItem = styled.li`
  width: 280px;
  height: 47px;
  margin-top: 15px;
  font-size: 14px;
  .portrait {
    display: block;
    float: left;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .name{
    padding: 5px 0;
    font-size: 14px;
    display: block;
    text-decoration: none;
  }
  .count{
    display: block;
    height: 22px;
    margin-top: 5px;
    font-size: 12px;
    color: #969696;
  }
`;

export const WriterFollow = styled.div`
  float: right;
  margin-top: -7px;
  height: 25px;
  color: #42c02e;
  font-size: 14px;
  .follow{
    font-size: 13px;
    padding-right:2px;
  }
`;

export const LoadMore = styled.a`
  box-sizing: border-box;
  margin: 30px auto 60px auto;
  display: block;
  height: 40px;
  width: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  border-radius: 20px;
  background-color: #a5a5a5;
  cursor: pointer;
`;

export const BackTop = styled.div`
  position: fixed;
  right: 100px;
  bottom: 50px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  background: #fff;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 12px;
  cursor: pointer;
`;