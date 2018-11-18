import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import images from '../../images/dummy.png'
import restaurant from '../../images/6.jpg'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

class BusBooking extends Component {
    state = {
        expanded: false,
    };
    style = {
        height: '10px'
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };
    render() {

        return (
        <div className="container">
            <Paper zDepth={5}  rounded={false}>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title="User Name"
                        subtitle="Email"
                        avatar={images}
                    />
                    <CardMedia
                        overlay={<CardTitle title="Bus Name" subtitle="" />}
                    >
                        <img style={{height: '500px'}} src={restaurant} alt="" />
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle"  />
                    <CardText >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="Expand" onClick={this.handleExpand} />
                        <FlatButton label="Reduce" onClick={this.handleReduce} />
                    </CardActions>
                </Card>
            </Paper>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        project: state
    }
}
export default connect(mapStateToProps)(BusBooking);