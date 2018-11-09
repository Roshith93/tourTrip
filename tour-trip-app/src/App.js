import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Component/Navbar/Navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Flights from './Component/MainPage/Flights'
import Hotels from './Component/MainPage/Hotels'
import Trains from './Component/MainPage/Trains'
import SignIn from './Component/Auth/SignIn';
import SignUp from './Component/Auth/SignUp';
import MainPage from './Component/MainPage/MainPage'
import Buses from './Component/MainPage/Buses'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Navbar />
          <MuiThemeProvider>
            <Switch>
              <Route exact path='/'component={MainPage} />
              <Route path='/flight' component={Flights} />
              <Route path='/train' component={Trains} />
              <Route path='/hotel' component={Hotels} />
              <Route path="/bus" component={Buses} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
