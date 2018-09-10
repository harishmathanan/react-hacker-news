import * as React from 'react';
import Navigation from './components/shared/navigation';

class App extends React.Component {
  public render() {
    return (
      <div className="container">
        <Navigation />
        <div>Some stuff...</div>
      </div>
    );
  }
};

export default App;
