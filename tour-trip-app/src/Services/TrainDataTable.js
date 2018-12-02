import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { addTrainData } from '../reducers/actions/projectAction';

function createData(id, name, dest_arrival_time, src_departure_time, travel_time, number, available) {
  return { id, name, dest_arrival_time, src_departure_time, travel_time, number, available};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Train Name' },
  { id: 'number', numeric: false, disablePadding: true, label: 'Train Number' },
  { id: 'dest_arrival_time', numeric: false, disablePadding: true, label: 'Arrival Time' },
  { id: 'src_departure_time', numeric: false, disablePadding: true, label: 'Departure Time' },
  { id: 'travel_time', numeric: false, disablePadding: true, label: 'Duration' },
  { id: 'available', numeric: false, disablePadding: true, label: 'Train Available Days' },

];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>

          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {

  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Available Train's Table
          </Typography>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
let f = [];

class TrainDataTable extends React.Component {

  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    show: false,
    source: null,
    destination: null,
    departureTime:null,
    duration: null,
    arrivalTime: null,
    number: null,
    travelsName: null,
    days: null,
    load: false,
    available: []
  };
  
  componentDidMount() {
    this.props.train.map((d, i) => {
        let available = [];
        for(let j = 0; j < 7; j++)
        if(d.days[j].runs === 'Y')
            available.push(<Chip label={d.days[j].code} key={j} variant="outlined" />)
        f.push(createData(i, d.name, d.dest_arrival_time, d.src_departure_time, d.travel_time, d.number, available));
        this.setState({available : available});
        available=[];
    }
    );
    this.setState({
      data: f,
    })
    this.setState({ show: true });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    const { train } = this.props;
    console.log("props ", this.props);
    console.log("bus data ", train[id]);
    const data = train[id];
    
    this.state.source = data.from_station.name;
    this.state.destination= data.to_station.name;
    this.state.departureTime= data.src_departure_time;
    this.state.arrivalTime= data.dest_arrival_time;
    this.state.duration= data.travel_time;
    this.state.number= data.number;
    this.state.travelsName= data.name;
    this.state.days= data.days
    console.log(this.state);
    this.props.addTrainData(this.state);
    this.setState({load: true});
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {

    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, load } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    if(load === true) return(<Redirect to='/trainBooking'/>)
    return (
      <div>
        {this.state.show ?

          <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data && stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((n, key) => {
                      const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={key}
                          selected={isSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            {n.name}
                          </TableCell>
                          <TableCell >{n.number}</TableCell>
                          <TableCell >{n.dest_arrival_time}</TableCell>
                          <TableCell >{n.src_departure_time}</TableCell>
                          <TableCell >{n.travel_time}</TableCell>
                          <TableCell >{n.available}</TableCell>                          
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={2} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper> :
          <p> Loading...</p>
        }
      </div>
    )


  }
}

TrainDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispachToProps = (dispatch) => {

  return {
    addTrainData: (data) => dispatch(addTrainData(data))
  }
}
export default connect(null, mapDispachToProps)(withStyles(styles)(TrainDataTable));
