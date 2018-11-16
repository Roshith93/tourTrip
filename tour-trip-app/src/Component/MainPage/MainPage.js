import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MainPageNews from '../../Services/MainPageNews';
class MainPage extends Component {

  componentDidMount() {
    console.log(this.props);
    let url = 'https://newsapi.org/v2/everything?q=travel&hl=en-IN&gl=IN&ceid=IN%3Aen&apiKey=dd9e85cfee714ace8811d8592515ce8f';
    axios.get(url)
      .then(response => {
        console.log(response.data.articles);
        this.state.data = response.data.articles;
        this.state.load = true;
        console.log(this.state);
      })
  }
  
  state = {
    data: [],
    load: false
  }
 
  render() {
    const { auth } = this.props;
    console.log(this.props)
    if (!auth.uid) return <Redirect to='/signin' />
  
    return (
      <div>
        {this.state.load ? 
          // this.state.data.map((news, i) => {
          //   console.log(news.title);
          //   <Card>
          //   <CardHeader
          //     title={news.title}
          //   />
          //   <CardMedia
          //     overlay={<CardTitle title={news.publishedAt}/>}
          //   >
          //     <img src={news.urlToImage} alt="" />
          //   </CardMedia>
          //   <CardTitle title={news.author}/>
          //   <CardText>
          //    {news.content}
          // </CardText>
          // </Card>
            <MainPageNews news={this.state.data} />
        // })
         : 
         <div>Fetching Latest News</div> 
          }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state.firestore);
  return {
    projects: state.firestore,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    'userBusData', 'userFlightData'
  ])
)(MainPage)