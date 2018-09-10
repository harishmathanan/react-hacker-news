import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/shared/navigation';
import Stories from './components/content/stories';

class App extends React.Component {
  public render() {
    return (
      <div className="container" style={{ marginLeft: 16, marginRight: 16 }}>
        <Navigation />

        <Switch>
          <Route exact={true} path="/" component={Stories} />
        </Switch>
      </div>
    );
  }
};

export default App;
