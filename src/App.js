import React from 'react';
import logo from './logo.svg';
import flypilotFetchWPRestAPI from './flypilotFetchWPRestAPI.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  componentDidMount() {
    const endpoint = 'https://mywebsite.wpengine.com/wp-json/acf/v3/pages/49'
    flypilotFetchWPRestAPI(endpoint).then((result)=> {
      this.setState({ 
        result: result
      });
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            <br /><br />If you see a JSON object below, you have set up your endpoint correctly:
          </p>
          <pre>{JSON.stringify(this.state.result, null, 2) }</pre>
        </header>
      </div>
    );
  }
}

export default App;
