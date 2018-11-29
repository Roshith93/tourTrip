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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { addFlightData } from '../reducers/actions/projectAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

let fullFlightData = [];
function createData(id, airline, arrtime, deptime, duration, totalFare) {
    console.log(airline, arrtime, deptime, duration, totalFare)
    return { id, airline, arrtime, deptime, duration, totalFare };
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
    { id: 'airline', numeric: false, disablePadding: true, label: 'Airline Name' },
    { id: 'arrtime', numeric: false, disablePadding: true, label: 'Arrival Time' },
    { id: 'deptime', numeric: false, disablePadding: true, label: 'Departure Time' },
    { id: 'duration', numeric: false, disablePadding: true, label: 'Duration' },
    { id: 'totalFare', numeric: false, disablePadding: true, label: 'Total Fare' },
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
                            Available Flights Table
          </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Book">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
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

class FlightDataTable extends React.Component {

    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
        show: false,
        load: false,
    };
    bookingData = {
        airline: '',
        arrtime: '',
        depterminal: '',
        deptime: '',
        duration: '',
        fare: '',
        flightcode: '',
        stops: '',
        splitduration: '',
        source: '',
        Destination: '',
        passangers: '',
        childbasefare: '',
        adultbasefare: '',
        sourceIATA: '',
        destinationIATA: '',
        children: '',
        adult: '',
    }
    componentDidMount() {
        console.log(this.props)
        let flight = [];
        this.props.flight.map((d, i) => {
            fullFlightData.push(d);
            flight.push(createData(i, d.airline, d.arrtime, d.deptime, d.duration,
                d.fare.totalbasefare));
        }
        );

        this.setState({
            data: flight,
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
        console.log(this.props.userData);
        const { userData } = this.props;
        let data = fullFlightData[id];
        this.bookingData.airline = data.airline;
        this.bookingData.arrtime = data.arrtime;
        this.bookingData.depterminal = data.depterminal;
        this.bookingData.deptime = data.deptime;
        this.bookingData.duration = data.duration;
        this.bookingData.flightcode = data.flightcode;
        this.bookingData.stops = data.stops;
        this.bookingData.splitduration = data.splitduration;
        this.bookingData.source = userData.source;
        this.bookingData.Destination = userData.dest;
        this.bookingData.passangers = userData.adult + userData.child;
        this.bookingData.childbasefare = data.fare.childbasefare;
        this.bookingData.adultbasefare = data.fare.adultbasefare;
        this.bookingData.sourceIATA = userData.sourceIATA;
        this.bookingData.destinationIATA = userData.destinationIATA;
        this.bookingData.children = userData.child;
        this.bookingData.adult = userData.adult;
        console.log(this.bookingData);
        this.props.addFlightData(this.bookingData);
        this.setState({ load: true });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        console.log(this.props)

        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        if (this.state.load === true) return (<Redirect to="/flightBooking" />)
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
                                                        {n.airline}
                                                    </TableCell>
                                                    <TableCell numeric>{n.arrtime}</TableCell>
                                                    <TableCell numeric>{n.deptime}</TableCell>
                                                    <TableCell numeric>{n.duration}</TableCell>
                                                    <TableCell numeric>{n.totalFare}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
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

FlightDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFlightData: (addData) => dispatch(addFlightData(addData))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(FlightDataTable));
