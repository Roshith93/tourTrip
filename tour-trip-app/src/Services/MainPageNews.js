import React from 'react';
import { Card,  CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import GridList from '@material-ui/core/GridList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
  
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1300,
    minHeight: 700,
    padding: '10px'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});
const MainPageNews = (props) =>{
    const { news } = props;
    const { classes } = props;

    return (
      <div className={classes.root}>
              <GridList cellHeight={750} className={classes.gridList}> 
      {  news.map((news, i) => {
            return(
              
            <a  target="_blank" href={news.url}>
            <Card key={i} >
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
    }
     </GridList>
          </div>
    )
}

MainPageNews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPageNews);