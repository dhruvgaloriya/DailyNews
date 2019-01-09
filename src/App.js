import React, { Component } from 'react';
import routes from './routes'
import HeaderComponent from './Header/HeaderComponent'
class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent>
        </HeaderComponent> 
        {routes}         
      </div>
    );
  }
}

export default App;
