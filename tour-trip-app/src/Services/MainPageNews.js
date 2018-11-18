import React from 'react';
import { Card,  CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { NavigationFullscreenExit } from 'material-ui/svg-icons';

const style = {
    textDecoration: 'none !important',
    margin: '20px',
    maxWidth: '500px',
    display: 'flex',
    align: 'center'
}
const MainPageNews = (props) =>{
    const { news } = props;
    return (
        news.map((news, i) => {
            console.log(news);
            return(
            <a  target="_blank" href={news.url}>
            <Card key={i} style={style}>
            <CardHeader
              title={news.title}
              subtitle="title"
            />
            <CardMedia
              overlay={<CardTitle title="Created At" subtitle={news.publishedAt}/>}
            >
              <img src={news.urlToImage} alt="Url Images" />
            </CardMedia>
            <CardTitle title={news.author} subtitle="Author"/>
            <CardText>
             {news.content}
          </CardText>
          </Card>
          </a>
            )
      })
    )
}

export default MainPageNews;