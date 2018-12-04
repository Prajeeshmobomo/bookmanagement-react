import React, { Component } from 'react';
import FlashMessage from './components/FlashMessage';
import AppRouter from './route'


class App extends Component {
  render() {
      return (
        <div className="App">
            <div>
              <FlashMessage />
              <AppRouter />
            </div>
        </div>
      );
  }
  }
export default App;