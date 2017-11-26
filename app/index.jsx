import React from 'react';
import {render} from 'react-dom';
import Navbar from './components/Navbar/index.jsx';

class App extends React.Component {
  render () {
    return (
      <Navbar />
    )
  }
}

render(<App/>, document.getElementById('app'));