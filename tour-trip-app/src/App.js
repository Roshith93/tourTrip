import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar/Navbar'
import MainPage from './Mainpage/MainPage'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="navbar">
        <MuiThemeProvider>
          <Navbar />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <MainPage />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
